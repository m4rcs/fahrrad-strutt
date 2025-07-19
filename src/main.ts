import {
  Bike,
  Clock,
  createIcons,
  House,
  Mail,
  Map as MapIcon,
  Menu,
  Phone,
  Pilcrow,
  ToolCase,
  Warehouse,
} from "lucide";

createIcons({
  icons: {
    House,
    Clock,
    Mail,
    Warehouse,
    Menu,
    MapIcon,
    Bike,
    ToolCase,
    Pilcrow,
    Phone,
  },
});

import "./main.scss";
import { createScrollNav, scrollNav_api } from "./scroll-nav";

// Setup burger menu on mobile devices
document.addEventListener("DOMContentLoaded", () => {
  // Initialize scroll navigation after DOM is loaded and styles are applied
  setTimeout(() => {
    createScrollNav("#fullpage", {
      scrollHorizontally: true,
      verticalCentered: false,
      sectionSelector: ".fpsection",
      slidesNavigation: true,
      container: "#fullpage",
    });

    scrollNav_api.setAllowScrolling(true);
  }, 100);
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll(".navbar-burger"), 0);

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach((el) => {
      el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target?.classList.toggle("is-active");
      });
    });
  }
});
