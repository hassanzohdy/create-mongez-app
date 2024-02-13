export default function myProfile(request, response) {
    const currentUser = request.user;
    return response.success({
        user: currentUser,
    });
}
