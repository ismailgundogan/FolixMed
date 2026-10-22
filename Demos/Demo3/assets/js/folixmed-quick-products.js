(function () {
    var modal = document.getElementById('folixQuickView');
    if (!modal) return;

    modal.addEventListener('show.bs.modal', function (event) {
        var trigger = event.relatedTarget;
        if (!trigger) return;
        var image = trigger.getAttribute('data-product-image');
        var name = trigger.getAttribute('data-product-name');
        var category = trigger.getAttribute('data-product-category');
        var description = trigger.getAttribute('data-product-description');
        var imageElement = document.getElementById('folixQuickViewImage');
        if (image) imageElement.src = image;
        if (name) { imageElement.alt = name; document.getElementById('folixQuickViewTitle').textContent = name; }
        if (category) document.getElementById('folixQuickViewCategory').textContent = category;
        if (description) document.getElementById('folixQuickViewDescription').textContent = description;
    });
}());
