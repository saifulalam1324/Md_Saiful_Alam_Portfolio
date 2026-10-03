const form = document.getElementById("contact-form");
  const note = document.getElementById("form-note");
  const submitBtn = form.querySelector(".form-submit");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: new FormData(form), // already includes access_key
      });
      const data = await response.json();

      if (data.success) {
        note.textContent = "✅ Message sent! I'll get back to you soon.";
        form.reset();
      } else {
        note.textContent = "❌ " + (data.message || "Something went wrong.");
        console.log(data);
      }
    } catch (error) {
      note.textContent = "❌ Network error. Please try again.";
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });