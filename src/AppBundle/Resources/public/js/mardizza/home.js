////////////////
// config demo

const managerNames = ["Jon", "Sansa", "Daenerys", "Tyrion", "Ramsay", "Arya"];
const $groupManagerInput = $(".group-manager-name");
const $loyaltyStampsInput = $(".stamps-input");

function getRandomManagerName() {
    return managerNames[Math.floor(Math.random()*managerNames.length)];
}

function changeManager() {
    if(! $groupManagerInput.prop("disabled")) {
        $groupManagerInput.val(getRandomManagerName());
    }

    $groupManagerInput.toggleClass('refresh');
}

// enable/disable group manager name input on button toggling
$('.manager-activation').on("change", function() {
    $groupManagerInput.prop("disabled", ! $groupManagerInput.prop("disabled"));

    changeManager();
});

// enable/disable loyalty stamps number input on button toggling
$('.promo-activation').on("change", function() {
    $loyaltyStampsInput.prop("disabled", ! $loyaltyStampsInput.prop("disabled"));
});