window.app.directive("fileUploader", function () {

    var ROOT = window.app.root,
        IMAGES_PATH = ROOT + "Scripts/app/modules/common/directives/fileUploader/css/img/",
        ICONS = {
            UPLOAD: IMAGES_PATH + "upload.jpg",
            LOADING: IMAGES_PATH + "loader.gif",
            ATTACH: IMAGES_PATH + "attachment-icon.png"
        };

    return {
        restrict: 'E',
        templateUrl: ROOT + 'Scripts/app/modules/common/directives/fileUploader/fileUploader.html',
        scope: {
            fileUploaderOptions: '=fileUploaderOptions'
        },
        link: function (scope, element, attrs) {

            scope.fileUploaderOptions.loadFile = function (fileName) {
                scope.fileName = fileName;
                updateIcon(ICONS.ATTACH);
            };

            bindEvents();

            scope.fileName = "";

            scope.imageUrl = ICONS.UPLOAD;

            scope.stylesPath = ROOT + 'Scripts/app/modules/common/directives/fileUploader/css/file-uploader.css';

            scope.fileUploaderOptions.fileChangeOptions = {
                onChange: function (e) {
                    if (e && e.target && e.target.files && e.target.files.length > 0) {
                        scope.fileName = e.target.files[0].name;
                    }
                    updateIcon(ICONS.LOADING);
                    upload();
                }
            };

            scope.triggerFileChooser = function () {
                var fileUploaderButton = element.find('.file-uploader');
                fileUploaderButton.trigger('click');
            };

            scope.cleanFile = function () {
                scope.fileName = "";
                scope.imageUrl = ICONS.UPLOAD;
                scope.fileUploaderOptions.onUpload("");
                bindEvents();
            };

            scope.isAttached = function () {
                return scope.imageUrl === ICONS.ATTACH && scope.fileName;
            };

            function bindEvents() {

                var dropContainer = element.find('.file-uploader-container');

                dropContainer.on('dragover', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    dropContainer.addClass('drop-hover');
                });

                dropContainer.on('dragleave', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    dropContainer.removeClass('drop-hover');
                });

                dropContainer.on('dragenter', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                });

                dropContainer.on('drop', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (e.originalEvent.dataTransfer) {
                        if (e.originalEvent.dataTransfer.files.length > 0) {
                            var file = e.originalEvent.dataTransfer.files[0];
                            scope.fileName = file.name;
                            updateIcon(ICONS.LOADING);
                            uploadFileOnDrop(file);
                        }
                    }
                    dropContainer.removeClass('drop-hover');
                    return false;
                });
            }

            function unbindEvents() {
                var dropContainer = element.find('.file-uploader-container');
                dropContainer.off('dragover');
                dropContainer.off('dragleave');
                dropContainer.off('dragenter');
                dropContainer.off('dragoverdrop');
            }

            function updateIcon(icon) {
                setTimeout(function () {
                    scope.imageUrl = icon;
                    scope.$apply();
                }, 0);
            }

            function upload() {
                element.find('form').unbind("submit").bind('submit', function () {
                    $(this).ajaxSubmit({
                        responseType: 'json',
                        contentType: "application/json; charset=utf-8",
                        success: function (responseData) {
                            if (scope.fileUploaderOptions && scope.fileUploaderOptions.onUpload &&
                                angular.isFunction(scope.fileUploaderOptions.onUpload)) {
                                scope.fileUploaderOptions.onUpload(responseData);
                            }
                            updateIcon(ICONS.ATTACH);
                            unbindEvents();
                        },
                        error: function (response, status, err) {
                            if (scope.fileUploaderOptions && scope.fileUploaderOptions.onError &&
                                angular.isFunction(scope.fileUploaderOptions.onError)) {
                                scope.fileUploaderOptions.onError(response, status, err);
                            }
                            updateIcon(ICONS.UPLOAD);
                            scope.fileName = "";
                        }
                    });
                    return false;
                }).submit();
            }

            function uploadFileOnDrop(file) {
                var xhr = new XMLHttpRequest(),
                    form = new FormData();

                form.append("file1", file);

                if (scope.fileUploaderOptions.parameters) {
                    scope.fileUploaderOptions.parameters.forEach(function (p) {
                        form.append(p.name, p.getValue());
                    });
                }

                xhr.onload = function (response) {
                    if (scope.fileUploaderOptions && scope.fileUploaderOptions.onUpload &&
                                 angular.isFunction(scope.fileUploaderOptions.onUpload)) {
                        scope.fileUploaderOptions.onUpload(JSON.parse(response.currentTarget.response));
                    }
                    updateIcon(ICONS.ATTACH);
                    unbindEvents();
                };

                xhr.onerror = function () {
                    updateIcon(ICONS.UPLOAD);
                    scope.fileName = "";
                }

                xhr.open("post", scope.fileUploaderOptions.action, true);
                xhr.send(form);
            }

            scope.$on("clean", function () {
                scope.fileName = "";
                updateIcon(ICONS.UPLOAD);
            });
        }
    };
});