import EditProfileForm from "../../../../components/EditProfileForm";

// interface ProfilePageProps {
//   params: {
//     userId: string;
//   };
// }

export default function ProfilePage() {
  const params: {userId} = JSON.parse(localStorage.getItem("user") || "{}");
  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Profile</h2>
      <EditProfileForm userId={params.userId} />
    </div>
  );
}
