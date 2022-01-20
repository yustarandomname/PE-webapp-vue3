<template>
  <div class="navWrapper">
    <div class="navHeader">Menu</div>

    <div class="navBar">
      <div v-for="navItem in navItems" class="navItem">
        <div
          class="navImg"
          :style="{ background: 'url(' + navItem.image + ')' }"
        ></div>
        <div class="navText">{{ navItem.title }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface NavItem {
  image: string;
  title: string;
  link?: string;
}

const navItems: NavItem[] = [
  { image: './cat1.png', title: 'Afschrijfboek', link: '/blog' },
  { image: './cat2.png', title: 'Eetlijsten', link: '/blog' },
  { image: './cat3.png', title: 'Media', link: '/blog' },
  { image: './cat4.png', title: 'Leden', link: '/blog' },
  { image: './cat5.png', title: 'Wedstrijden', link: '/blog' },
  { image: './cat6.png', title: 'Agenda', link: '/blog' },
];
</script>

<style scoped lang="scss">
.navWrapper {
  width: var(--width-large);
  max-width: var(--max-width);
  margin: 0 auto var(--spacing-600);

  .navHeader {
    font-size: var(--title);
    font-weight: var(--thicc);
    margin-bottom: var(--spacing-300);
  }
  .navBar {
    display: flex;
    justify-content: space-between;
    & .navItem {
      display: flex;
      align-items: center;
      flex-direction: column;
      gap: var(--spacing-200) 0;
      .navImg {
        --aspect-ratio: 0.66;

        background-color: white !important;
        background-position: center center !important;
        background-size: contain !important;
        background-repeat: no-repeat !important;
        border-radius: var(--corner-radius);
        width: var(--spacing-900);
        height: calc(var(--spacing-900) / var(--aspect-ratio));
      }
    }
  }
}
</style>
