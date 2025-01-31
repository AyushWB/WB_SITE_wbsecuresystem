export default async function leadGen(data) {
  try {
    const utm_source_active = localStorage.getItem('utm_source_active');
    let response = await fetch("/api/save_lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, is_ad: utm_source_active }),
    });
    response = await response.json();
    return response;
  } catch (error) {
    console.log(error);
  }
}
