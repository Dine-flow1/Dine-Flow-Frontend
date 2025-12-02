interface Props {
  title: string;
  links: Array<{ label: string; href: string }>;
}

export default function LinksColumn({ title, links }: Props) {
  return (
    <div className="col-span-1 sm:col-span-1 lg:col-span-1">
      <h3 className="mb-4 font-serif text-lg font-semibold sm:mb-6">{title}</h3>
      <ul className="space-y-3 text-gray-400 sm:space-y-4">
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="text-base transition-colors hover:text-white">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
