import Company from '@/components/pages/Company';
import { getPartners, getCompanyServices } from '@/services/api';
import { mockCompanyServices, mockPartners } from '@/services/services';
import { metadata } from '@/data/metadata';

async function getPageData() {
  let partnersData = [];
  let companyServicesData = [];

  try {
    const [partners, companyServices] = await Promise.all([
      getPartners(),
      getCompanyServices(),
    ]);
    partnersData = partners.data;
    companyServicesData = companyServices.data;
  } catch (error) {
    console.error('Failed to fetch data, using mock data:', error);
    partnersData = mockPartners;
    companyServicesData = mockCompanyServices;
  }

  return {
    partners: partnersData,
    companyServices: companyServicesData,
  };
}

export default async function Page() {
  const data = await getPageData();
  return <Company {...data} />;
}
