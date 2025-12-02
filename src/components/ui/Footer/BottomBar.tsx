export default function BottomBar() {
  return (
    <div className="flex flex-col items-center justify-between pt-8 mt-8 border-t border-gray-800 sm:flex-row sm:pt-12 sm:mt-12">
      <p className="text-sm text-center text-gray-400 sm:text-left sm:text-base">
        © 2024 DineFlow. All rights reserved.
      </p>
      <div className="flex mt-4 space-x-6 sm:mt-0">
        <a href="/terms" className="text-sm text-gray-400 transition-colors hover:text-white sm:text-base">
          Terms
        </a>
        <a href="/privacy" className="text-sm text-gray-400 transition-colors hover:text-white sm:text-base">
          Privacy
        </a>
        <a href="/cookies" className="text-sm text-gray-400 transition-colors hover:text-white sm:text-base">
          Cookies
        </a>
      </div>
    </div>
  );
}
