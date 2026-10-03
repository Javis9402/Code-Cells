export function normalizeActualPageName(url) {
    const splittedUrl = url.split("/");
    console.log(splittedUrl);
    const pageNameAndExtension = splittedUrl.at(-1);
    const spiltNameAndExtension = pageNameAndExtension.split(".");
    const pageName = spiltNameAndExtension[0];
    return pageName;
}