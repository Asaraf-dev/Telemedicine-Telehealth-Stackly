/*--- Browse by Specialty Section Start ---*/
const ssIndBlogReadButtons = document.querySelectorAll(".tt-doctors-specialty-link");
    if (ssIndBlogReadButtons.length) {
        ssIndBlogReadButtons.forEach(function (ssButton) {
            ssButton.addEventListener("click", function (ssEvent) {
                ssEvent.preventDefault();
                ssEvent.stopPropagation();
                window.location.href = "404.html";
            });
        });
    }
/*--- Browse by Specialty Section End ---*/

/*--- All Doctors Directory Section Start ---*/
(function() {
    const doctorGrid = document.getElementById("ttDoctorsDirectoryGrid");
    if (!doctorGrid) return;

    const searchInput = document.getElementById("ttDoctorSearch");
    const searchClear = document.getElementById("ttDoctorSearchClear");
    const specialtyFilter = document.getElementById("ttDoctorSpecialty");
    const experienceFilter = document.getElementById("ttDoctorExperience");
    const consultationFilter = document.getElementById("ttDoctorConsultation");
    const sortFilter = document.getElementById("ttDoctorSort");
    const resultCount = document.getElementById("ttDoctorsResultCount");
    const emptyState = document.getElementById("ttDoctorsEmpty");
    const resetButton = document.getElementById("ttDoctorReset");
    const emptyResetButton = document.getElementById("ttDoctorEmptyReset");

    /*--- Sample Doctor Data: Replace With Verified Doctor Records ---*/
    const doctors = [
        {id:"doctor-1",name:"Dr. Alex Morgan",initials:"AM",specialty:"General Medicine",role:"General Physician",experience:5,consultation:"Both"},
        {id:"doctor-2",name:"Dr. Sophia Williams",initials:"SW",specialty:"Cardiology",role:"Cardiology Specialist",experience:12,consultation:"Online"},
        {id:"doctor-3",name:"Dr. Daniel Carter",initials:"DC",specialty:"Dermatology",role:"Dermatology Specialist",experience:8,consultation:"In-person"},
        {id:"doctor-4",name:"Dr. Olivia Bennett",initials:"OB",specialty:"Pediatrics",role:"Pediatric Specialist",experience:10,consultation:"Both"},
        {id:"doctor-5",name:"Dr. Ethan Brooks",initials:"EB",specialty:"Neurology",role:"Neurology Specialist",experience:15,consultation:"Online"},
        {id:"doctor-6",name:"Dr. Amelia Clark",initials:"AC",specialty:"Orthopedics",role:"Orthopedic Specialist",experience:7,consultation:"In-person"},
        {id:"doctor-7",name:"Dr. Noah Wilson",initials:"NW",specialty:"Gynecology",role:"Gynecology Specialist",experience:18,consultation:"Both"},
        {id:"doctor-8",name:"Dr. Isabella Taylor",initials:"IT",specialty:"Dentistry",role:"Dental Specialist",experience:3,consultation:"Online"}
    ];

    /*--- Experience Range ---*/
    function matchesExperience(experience, range) {
        if (range === "0-5") return experience >= 0 && experience <= 5;
        if (range === "6-10") return experience >= 6 && experience <= 10;
        if (range === "11-15") return experience >= 11 && experience <= 15;
        if (range === "16+") return experience >= 16;
        return true;
    }

    /*--- Doctor Card Template ---*/
    function createDoctorCard(doctor) {
        return `
            <article class="tt-doctors-directory-card">
                <div class="tt-doctors-directory-card-top">
                    <div class="tt-doctors-directory-avatar">${doctor.initials}</div>
                    <div class="tt-doctors-directory-card-info">
                        <h3>${doctor.name}</h3>
                        <p>${doctor.role}</p>
                    </div>
                    <span class="tt-doctors-directory-sample">SAMPLE</span>
                </div>
                <div class="tt-doctors-directory-card-body">
                    <div class="tt-doctors-directory-card-meta">
                        <div class="tt-doctors-directory-meta-item">
                            <i class="bi bi-heart-pulse"></i>
                            <span>${doctor.specialty}</span>
                        </div>
                        <div class="tt-doctors-directory-meta-item">
                            <i class="bi bi-briefcase"></i>
                            <span>${doctor.experience} Years Experience</span>
                        </div>
                    </div>
                    <div class="tt-doctors-directory-consultation">
                        <span>Consultation Type</span>
                        <strong>${doctor.consultation}</strong>
                    </div>
                    <a href="doctor-details.html?id=${encodeURIComponent(doctor.id)}" class="tt-doctors-directory-profile">
                        View Doctor Profile <i class="bi bi-arrow-up-right"></i>
                    </a>
                </div>
            </article>
        `;
    }

    /*--- Filter and Sort Doctors ---*/
    function filterDoctors() {
        const searchValue = searchInput.value.trim().toLowerCase();
        const specialtyValue = specialtyFilter.value;
        const experienceValue = experienceFilter.value;
        const consultationValue = consultationFilter.value;
        const sortValue = sortFilter.value;

        let filteredDoctors = doctors.filter(function(doctor) {
            const matchesName = doctor.name.toLowerCase().includes(searchValue);
            const matchesSpecialty = specialtyValue === "all" || doctor.specialty === specialtyValue;
            const matchesExperienceRange = matchesExperience(doctor.experience, experienceValue);
            const matchesConsultation = consultationValue === "all" || doctor.consultation === consultationValue;

            return matchesName && matchesSpecialty && matchesExperienceRange && matchesConsultation;
        });

        /*--- Sorting ---*/
        filteredDoctors.sort(function(a, b) {
            if (sortValue === "name-asc") return a.name.localeCompare(b.name);
            if (sortValue === "name-desc") return b.name.localeCompare(a.name);
            if (sortValue === "experience-desc") return b.experience - a.experience;
            if (sortValue === "experience-asc") return a.experience - b.experience;
            return 0;
        });

        /*--- Render Results ---*/
        doctorGrid.innerHTML = filteredDoctors.map(createDoctorCard).join("");
        resultCount.textContent = filteredDoctors.length;
        emptyState.hidden = filteredDoctors.length !== 0;
        doctorGrid.hidden = filteredDoctors.length === 0;

        searchClear.classList.toggle("is-visible", searchValue.length > 0);
    }

    /*--- Reset All Filters ---*/
    function resetFilters() {
        searchInput.value = "";
        specialtyFilter.value = "all";
        experienceFilter.value = "all";
        consultationFilter.value = "all";
        sortFilter.value = "name-asc";
        filterDoctors();
    }

    /*--- Event Listeners ---*/
    searchInput.addEventListener("input", filterDoctors);
    specialtyFilter.addEventListener("change", filterDoctors);
    experienceFilter.addEventListener("change", filterDoctors);
    consultationFilter.addEventListener("change", filterDoctors);
    sortFilter.addEventListener("change", filterDoctors);

    searchClear.addEventListener("click", function() {
        searchInput.value = "";
        filterDoctors();
        searchInput.focus();
    });

    resetButton.addEventListener("click", resetFilters);
    emptyResetButton.addEventListener("click", resetFilters);

    /*--- Initial Render ---*/
    filterDoctors();
})();
/*--- All Doctors Directory Section End ---*/

/*--- Section Start ---*/
/*--- Section End ---*/

/*--- Section Start ---*/
/*--- Section End ---*/

/*--- Section Start ---*/
/*--- Section End ---*/

/*--- Section Start ---*/
/*--- Section End ---*/