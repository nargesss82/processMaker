


// Define all sections with their configuration
const sections = [
  {
    id: "subtitle0000000001",
    fields: [
      "#txt_firstName",
      "#txt_lastName",
      "#txt_nationalCode",
      "#dat_birthday",
      "#txt_fathername",
      "#txt_certificateNumber",
      "#txt_phone",
      "#txt_telephone",
      "#rad_gender",
      "#txt_birthPlace"
    ],
    style: {
      backgroundColor: "#ddfccc",
      color: "#01574a"
    }
  },
  {
    id: "subtitle0000000002",
    fields: [
      "#txt_legalTelephone",
      "#txt_legalPhone",
      "#txt_legalNationalCode",
      "#txt_legalFirstname",
      "#txt_legalLastname"
    ],
    style: {
      backgroundColor: "#ddfccc",
      color: "#01574a"
    }
  },
  {
    id: "subtitle0000000003",
    fields: [
      "#txt_postalCode",
      "#drp_province",
      "#drp_city",
      "#txr_address",
      "#txt_domainTelephone"
    ],
    style: {
      backgroundColor: "#ddfccc",
      color: "#01574a"
    }
  },
  {
    id: "subtitle0000000004",
    fields: [
      "#mfi_uploadFile",
      "#txt_file"
    ],
    style: {
      backgroundColor: "#014339",
      color: "white"
    }
  }
];

// Initialize all sections
sections.forEach(section => {
  // Store visibility state in the section object
  section.visible = false;

  // Apply initial styles
  const $header = $(`#${section.id}`);
  $header.css({
    cursor: "pointer",
    backgroundColor: section.style.backgroundColor,
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "10px",
    color: section.style.color
  });

  // Hide fields initially
  $(section.fields.join(", ")).hide();

  // Add click handler
  $header.click(function() {
    section.visible = !section.visible;

    if (section.visible) {
      $(section.fields.join(", ")).slideDown(300);
      $(`#${section.id} .icon`).html("▼");
    } else {
      $(section.fields.join(", ")).slideUp(300);
      $(`#${section.id} .icon`).html("►");
    }
  });

  // Add icon if it doesn't exist
  if ($(`#${section.id} .icon`).length === 0) {
    $header.append('<span class="icon">►</span>');
  }
});  
function showS() {
  const value = $("#drp_status").getControl().val();
  if (value != "0") {
    $("#subtitle0000000002").show();
    $("#subtitle0000000001").hide();
  } else {
    $("#subtitle0000000002").hide();
    $("#subtitle0000000001").show();
  }
}

// اجرای اولیه بعد از اینکه DOM کاملاً لود شد

showS(); // اجرای تابع در ابتدا
$("#drp_status").change(showS); // اضافه کردن event listener

