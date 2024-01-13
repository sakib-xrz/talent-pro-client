import Image from "next/image";

export default function PersonalInfo({ user }) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-primary">
        Personal Information
      </h2>
      <div className="flex items-center gap-4">
        <Image
          height={200}
          width={200}
          alt="profile-photo"
          src={user?.image_url}
          className="h-14 w-14 rounded-md object-cover"
        />

        <div>
          {user.name?.first_name.length > 0 ||
          user.name?.last_name.length > 0 ? (
            <h3 className="text-lg font-semibold text-primary">
              {user.name.first_name} {user.name.last_name}
            </h3>
          ) : (
            <h3 className="text-lg font-semibold text-primary">
              No name provided
            </h3>
          )}

          <p className="tex-sm text-secondary-foreground">{user.email}</p>
        </div>
      </div>
    </div>
  );
}
