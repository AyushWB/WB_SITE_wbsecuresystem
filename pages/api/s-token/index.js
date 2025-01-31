import { encrypt } from "@/utils/crypto"; // Adjust path as per your project structure

const WBCRM_API = process.env.WBCRM_API;

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  try {
    const response = await fetch(`${WBCRM_API}/csrf-token`);
    if (!response.ok) {
      return res.status(response.status).json({ success: false, message: "Failed to fetch CSRF token" });
    }

    const data = await response.json();
    const encryptedCSRFToken = encrypt(data.csrfToken);

    return res.status(200).json({ csrfToken: encryptedCSRFToken });
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
