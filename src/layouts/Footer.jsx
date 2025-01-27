function Footer() {
  return (
    <footer className="absolute bottom-0 min-h-[70px] w-full border-t-2 border-black bg-green-700 text-white group-[.is-notFound]:hidden dark:border-white">
      <div className="mx-auto flex min-h-[70px] w-full items-center justify-center px-1 lg:container sm:px-6 lg:max-w-[1225px]">
        <p className="text-lg">
          Made with ❤ by{" "}
          <a className="font-semibold" href="https://github.com/me-lad">
            me-lad
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
