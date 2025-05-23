export const metadata = {
  title: "Login",
  description: "This is Login Form",
};

export default function RootLayout({ children }) {
  return (
    <>
      <section className=" bg-gray-50 light:bg-gray-900 min-h-screen flex items-center justify-center px-6 py-8">
        <div className="flex flex-col md:flex-row bg-white light:bg-gray-800 rounded-lg shadow-lg max-w-5xl w-full">

          <div
            className="hidden md:flex flex-col justify-center items-center bg-primary-600 text-white md:w-1/2 p-10 rounded-l-lg">
            <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"
              alt="UI Design" className="rounded-md mb-6 shadow-lg max-w-full h-auto" />
            <h2 className="text-3xl font-extrabold mb-2">Welcome Back!</h2>
            <p className="text-lg text-white/90 text-center max-w-xs">
              Discover a better way to manage your projects with sleek, intuitive UI and powerful features.
            </p>
          </div>

          {children}

        </div>
      </section>
    </>
  );
}
