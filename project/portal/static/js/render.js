const menuId = ["hardwareResource", "softwarePlatform"];
menuId.map((mid) => {
  $(`#${mid}`)
    .click(function() {
      $(this).addClass('selected').siblings().removeClass('selected');
      $(`#${mid}Content`).show().siblings().hide();
    });
});