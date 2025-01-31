import { decrypt } from "@/utils/crypto"; // Adjust path as per your project structure

const WBCRM_API = process.env.WBCRM_API;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  try {
    const clientIP = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    req.body.yaship = clientIP;

    const { token } = req.body;
    req.body.token = decrypt(token); // Decrypt the token

    const response = await fetch(`${WBCRM_API}/new_lead`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });

    // if (!response.ok) {
    //   return res.status(response.status).json({ success: false, message: "Unexpected response from server" });
    // }

    return res.status(200).json({
      status: true,
      msg: "Thank you for contacting us. Our team will reach you soon with the best price..!",
    });
  } catch (error) {
    console.error("Error saving lead:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
