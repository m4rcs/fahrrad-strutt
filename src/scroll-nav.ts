interface ScrollNavOptions {
  sectionSelector: string;
  container: string;
  verticalCentered?: boolean;
  scrollHorizontally?: boolean;
  slidesNavigation?: boolean;
}

class ScrollNav {
  private container: HTMLElement;
  private sections: HTMLElement[];
  private currentSection: number = 0;
  private allowScrolling: boolean = true;
  private isScrolling: boolean = false;
  private options: ScrollNavOptions;

  constructor(containerSelector: string, options: ScrollNavOptions) {
    this.options = {
      verticalCentered: true,
      scrollHorizontally: false,
      slidesNavigation: false,
      ...options,
    };

    this.container = document.querySelector(containerSelector) as HTMLElement;
    if (!this.container) {
      throw new Error(`Container ${containerSelector} not found`);
    }

    this.sections = Array.from(this.container.querySelectorAll(this.options.sectionSelector));
    this.init();
  }

  private init(): void {
    this.setupStyles();
    this.setupEventListeners();
    this.updateActiveSection();

    // Navigate to section from URL hash
    if (window.location.hash) {
      const anchor = window.location.hash.substring(1);
      this.moveTo(anchor);
    }
  }

  private setupStyles(): void {
    // Calculate available height minus navbar
    const navbar = document.querySelector(".navbar") as HTMLElement;
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    const availableHeight = `calc(100vh - ${navbarHeight}px)`;

    // Apply container styles
    this.container.style.height = availableHeight;
    this.container.style.overflow = "hidden";
    this.container.style.position = "relative";

    // Apply section styles
    this.sections.forEach((section, index) => {
      section.style.height = availableHeight;
      section.style.position = "absolute";
      section.style.top = "0";
      section.style.left = "0";
      section.style.width = "100%";
      section.style.transform = `translateY(${index * 100}%)`;
      section.style.transition = "transform 0.7s ease-in-out";

      if (!this.options.verticalCentered) {
        section.style.display = "flex";
        section.style.flexDirection = "column";
      } else {
        section.style.display = "flex";
        section.style.alignItems = "center";
        section.style.justifyContent = "center";
      }
    });
  }

  private setupEventListeners(): void {
    // Wheel event for scroll navigation
    document.addEventListener(
      "wheel",
      (e) => {
        if (!this.allowScrolling || this.isScrolling) return;

        e.preventDefault();

        if (e.deltaY > 0 && this.currentSection < this.sections.length - 1) {
          this.moveToSection(this.currentSection + 1);
        } else if (e.deltaY < 0 && this.currentSection > 0) {
          this.moveToSection(this.currentSection - 1);
        }
      },
      { passive: false },
    );

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (!this.allowScrolling || this.isScrolling) return;

      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
          e.preventDefault();
          if (this.currentSection < this.sections.length - 1) {
            this.moveToSection(this.currentSection + 1);
          }
          break;
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          if (this.currentSection > 0) {
            this.moveToSection(this.currentSection - 1);
          }
          break;
        case "Home":
          e.preventDefault();
          this.moveToSection(0);
          break;
        case "End":
          e.preventDefault();
          this.moveToSection(this.sections.length - 1);
          break;
      }
    });

    // Handle navbar clicks
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement;

      if (link?.getAttribute("href")?.startsWith("#")) {
        e.preventDefault();
        const anchor = link.getAttribute("href")?.substring(1);
        if (anchor) this.moveTo(anchor);
      }
    });

    // Handle browser back/forward
    window.addEventListener("popstate", () => {
      if (window.location.hash) {
        const anchor = window.location.hash.substring(1);
        this.moveTo(anchor);
      }
    });

    // Touch events for mobile
    let touchStartY = 0;
    let touchStartTime = 0;

    document.addEventListener(
      "touchstart",
      (e) => {
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
      },
      { passive: true },
    );

    document.addEventListener(
      "touchend",
      (e) => {
        if (!this.allowScrolling || this.isScrolling) return;

        const touchEndY = e.changedTouches[0].clientY;
        const touchEndTime = Date.now();
        const deltaY = touchStartY - touchEndY;
        const deltaTime = touchEndTime - touchStartTime;

        // Only trigger if touch was quick and significant
        if (Math.abs(deltaY) > 50 && deltaTime < 300) {
          if (deltaY > 0 && this.currentSection < this.sections.length - 1) {
            this.moveToSection(this.currentSection + 1);
          } else if (deltaY < 0 && this.currentSection > 0) {
            this.moveToSection(this.currentSection - 1);
          }
        }
      },
      { passive: true },
    );
  }

  private moveToSection(index: number): void {
    if (index < 0 || index >= this.sections.length || index === this.currentSection) {
      return;
    }

    this.isScrolling = true;
    this.currentSection = index;

    // Update transforms
    this.sections.forEach((section, i) => {
      const offset = (i - this.currentSection) * 100;
      section.style.transform = `translateY(${offset}%)`;
    });

    // Update URL hash
    const anchor = this.sections[index].getAttribute("data-anchor");
    if (anchor) {
      history.pushState(null, "", `#${anchor}`);
    }

    this.updateActiveSection();

    // Reset scrolling flag after animation
    setTimeout(() => {
      this.isScrolling = false;
    }, 700);
  }

  private moveTo(anchor: string): void {
    const sectionIndex = this.sections.findIndex((section) => section.getAttribute("data-anchor") === anchor);

    if (sectionIndex !== -1) {
      this.moveToSection(sectionIndex);
    }
  }

  private updateActiveSection(): void {
    // Update navbar active states
    document.querySelectorAll(".navbar-item").forEach((item) => {
      item.classList.remove("is-active");
    });

    const anchor = this.sections[this.currentSection].getAttribute("data-anchor");
    if (anchor) {
      const activeLink = document.querySelector(`a[href="#${anchor}"]`);
      if (activeLink) {
        activeLink.classList.add("is-active");
      }
    }
  }

  // Public API
  public setAllowScrolling(allow: boolean): void {
    this.allowScrolling = allow;
  }

  public moveToAnchor(anchor: string): void {
    this.moveTo(anchor);
  }

  public moveToIndex(index: number): void {
    this.moveToSection(index);
  }

  public getCurrentSection(): number {
    return this.currentSection;
  }
}

// Global API similar to fullpage.js
let scrollNavInstance: ScrollNav | null = null;

export function createScrollNav(containerSelector: string, options: ScrollNavOptions): ScrollNav {
  scrollNavInstance = new ScrollNav(containerSelector, options);
  return scrollNavInstance;
}

// Global API object
export const scrollNav_api = {
  setAllowScrolling: (allow: boolean) => {
    if (scrollNavInstance) {
      scrollNavInstance.setAllowScrolling(allow);
    }
  },
  moveTo: (anchor: string) => {
    if (scrollNavInstance) {
      scrollNavInstance.moveToAnchor(anchor);
    }
  },
  moveToSection: (index: number) => {
    if (scrollNavInstance) {
      scrollNavInstance.moveToIndex(index);
    }
  },
};
