export async function GET() {
  try {
    const headers = new Headers({
      "Set-Cookie": `token=; httpOnly; Path=/`,
    });

    return Response.json(
      { message: "Logout successful" },
      { status: 200, headers: headers }
    );
  } catch (error) {
    return Response.json({ message: 'Something went wrong.' }, { status: 404 });
  }
}
