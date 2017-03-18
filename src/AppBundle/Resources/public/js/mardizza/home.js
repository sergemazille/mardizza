// ===========
// config demo
// ===========

const managerNames = ["Jon", "Sansa", "Daenerys", "Tyrion", "Ramsay", "Arya"];
const $groupManagerInput = $(".group-manager-name");
const $loyaltyStampsInput = $(".stamps-input");
let changedAllowed = true;


// manager config part
// ===================

// manager name change
function getRandomManagerName() {
    return managerNames[Math.floor(Math.random()*managerNames.length)];
}

function changeManager() {
    if(changedAllowed) {
        $groupManagerInput.val(getRandomManagerName());
    }
}

function buttonClickBehaviour() {
    changedAllowed = ! $(".group-manager-name").prop("disabled");
}

$(".group-manager-button").click(changeManager);

// enable/disable group manager name input on button toggling
$('.manager-activation').on("change", function() {
    $groupManagerInput.prop("disabled", ! $groupManagerInput.prop("disabled"));

    buttonClickBehaviour();
});


// loyalty card part
// =================

// enable/disable loyalty stamps number input on button toggling
$('.promo-activation').on("change", function() {
    $loyaltyStampsInput.prop("disabled", ! $loyaltyStampsInput.prop("disabled"));
    $(".loyalty-group").toggleClass("invisible");
});