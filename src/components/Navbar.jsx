import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Stack from '@mui/material/Stack';
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link";
import { cookies } from "next/headers";
export default function Navbar() {
  const res = cookies().get("token");
  const condition = res?.value == "" || res?.value === undefined
  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography>ANKUR</Typography>
          <Stack direction={"row"} gap={4}>
            <Link href={"/"}>Home</Link>
            {condition == true && (
              <>
                <Link href={"/register"}>Sign up</Link>
                <Link href={"/login"}>Login</Link>
              </>
            )}
            <Link href={"/about"}>About</Link>
            {condition == false && (
              <>
                <Link href={"/dashboard"}>Dashboard</Link>
                <Link href={"/logout"}>Logout</Link>
              </>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
}
