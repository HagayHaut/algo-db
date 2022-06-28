import React from "react";

function UserPage({ user }) {
  return (
    <div>
      <h1>User Page</h1>
      <h2>Hello, {user.username}!</h2>
    </div>
  );
}

export default UserPage;
