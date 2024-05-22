export default async function logout() {
  localStorage.removeItem("jwt_token_session");
}
