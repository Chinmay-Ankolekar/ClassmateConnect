import Navbar from "./Navbar";

const Profile = ({ token }) => {
  console.log(token);
  return (
    <>
      <Navbar token={token} />
      <div class="m-10 max-w-sm">
        <div class="rounded-lg border bg-white px-4 pt-8 pb-10 shadow-lg">
          <div class="relative mx-auto w-36 rounded-full">
            <span class="absolute right-0 m-3 h-3 w-3 rounded-full bg-green-500 ring-2 ring-green-300 ring-offset-2"></span>
            <img
              class="mx-auto h-auto w-full rounded-full"
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <h1 class="my-1 text-center text-xl font-bold leading-8 text-gray-900">{token.user.user_metadata.fullName}</h1>
          <h3 class="font-lg text-semibold text-center leading-6 text-gray-600">
            {token.user.email}
          </h3>
          
          <ul class="mt-3 divide-y rounded bg-gray-100 py-2 px-3 text-gray-600 shadow-sm hover:text-gray-700 hover:shadow">
            <li class="flex items-center py-3 text-sm">
              <span>Fullname</span>
              <span class="ml-auto">
                <span class="rounded-full bg-green-200 py-1 px-2 text-xs font-medium text-green-700">
                {token.user.user_metadata.fullName}
                </span>
              </span>
            </li>
            <li class="flex items-center py-3 text-sm">
              <span>Email</span>
              <span class="ml-auto">{token.user.email}</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Profile;
