export default function logout(request, response) {
    const user = request.user;
    const currentAccessToken = request.authorizationValue();
    user.removeAccessToken(currentAccessToken);
    return response.success();
}
