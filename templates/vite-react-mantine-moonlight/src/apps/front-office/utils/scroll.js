export default function scrollTop() {
    const scrollOptions = { behavior: "smooth" };
    scrollOptions.top = 0;
    window.scrollTo(scrollOptions);
}
export function scrollTo(element) {
    const scrollOptions = { behavior: "smooth" };
    scrollOptions.top = 0;
    element.scrollIntoView(scrollOptions);
}
