import BrandBlock from "./Footer/BrandBlock";
import LinksColumn from "./Footer/LinksColumn";
import MobileSocials from "./Footer/MobileSocials";
import BottomBar from "./Footer/BottomBar";

const Footer = () => {
  const productLinks = [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "API", href: "/api" },
    { label: "Integrations", href: "/integrations" },
  ];

  const companyLinks = [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ];

  const supportLinks = [
    { label: "Help Center", href: "/help" },
    { label: "Documentation", href: "/docs" },
    { label: "Community", href: "/community" },
    { label: "Status", href: "/status" },
  ];

  return (
    <footer className="text-white bg-gray-900">
      <div className="container px-4 py-8 mx-auto sm:px-6 lg:px-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-12">
          <BrandBlock />
          <LinksColumn title="Product" links={productLinks} />
          <LinksColumn title="Company" links={companyLinks} />
          <div className="hidden lg:col-span-1 lg:block">
            <LinksColumn title="Support" links={supportLinks} />
          </div>
        </div>

        <MobileSocials />
        <BottomBar />
      </div>
    </footer>
  );
};

export default Footer;