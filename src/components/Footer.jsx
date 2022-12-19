const navigation = {
  main: [
    { name: "Movie", href: "/" },
    {
      name: "Project Repository",
      href: "https://github.com/kafle1/internsathi-react-moviez",
    },
    { name: "Developer", href: "https://github.com/kafle1/" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-6 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav
          className="-mx-5 -my-2 flex flex-wrap justify-center"
          aria-label="Footer"
        >
          {navigation.main.map((item) => (
            <div key={item.name} className="px-5 py-2">
              <a
                href={item.href}
                className="text-base text-gray-500 hover:text-gray-900"
              >
                {item.name}
              </a>
            </div>
          ))}
        </nav>

        <p className="mt-8 text-center text-base text-gray-400">
          &copy; 2022 Moviez (@kafle1), Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
