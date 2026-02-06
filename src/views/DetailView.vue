<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, MapPin, Calendar, Phone, User } from 'lucide-vue-next'
import { useDetailStore } from '@/stores/detailStore'
import AppLoading from '@/components/common/AppLoading.vue'
import PhotoSlider from '@/components/detail/PhotoSlider.vue'

const route = useRoute()
const router = useRouter()
const detailStore = useDetailStore()

const id = computed(() => route.params.id as string)

const photos = computed(() => {
  if (!detailStore.item) return []
  return detailStore.item.photos?.length ? detailStore.item.photos : [detailStore.item.photo]
})

const goBack = () => {
  router.back()
}

onMounted(() => {
  detailStore.getDetail(id.value)
})

onUnmounted(() => {
  detailStore.clearDetail()
})
</script>

<template>
  <div class="detail">
    <button class="detail__back" @click="goBack">
      <ArrowLeft :size="20" />
      <span>Geri Dön</span>
    </button>

    <AppLoading v-if="detailStore.loading" />

    <div v-else-if="detailStore.error" class="detail__error">
      <p>{{ detailStore.error }}</p>
      <button class="detail__error-btn" @click="goBack">Ana Sayfaya Dön</button>
    </div>

    <template v-else-if="detailStore.item">
      <div class="detail__hero">
        <PhotoSlider :photos="photos" class="detail__slider" />

        <div class="detail__info">
          <header class="detail__header">
            <h1 class="detail__title">{{ detailStore.item.title }}</h1>
            <span class="detail__model">{{ detailStore.item.modelName }}</span>
          </header>

          <div class="detail__price">{{ detailStore.item.priceFormatted }}</div>

          <div class="detail__meta">
            <div class="detail__meta-item">
              <MapPin :size="18" />
              <span>{{ detailStore.item.location.cityName }}, {{ detailStore.item.location.townName }}</span>
            </div>
            <div class="detail__meta-item">
              <Calendar :size="18" />
              <span>{{ detailStore.item.dateFormatted }}</span>
            </div>
          </div>

          <div class="detail__seller">
            <h3 class="detail__seller-title">Satıcı Bilgileri</h3>
            <div class="detail__seller-info">
              <User :size="18" />
              <span>{{ detailStore.item.userInfo.nameSurname }}</span>
            </div>
            <a :href="`tel:${detailStore.item.userInfo.phone}`" class="detail__seller-phone">
              <Phone :size="18" />
              <span>{{ detailStore.item.userInfo.phoneFormatted }}</span>
            </a>
          </div>
        </div>
      </div>

      <div class="detail__content">
        <div v-if="detailStore.item.properties?.length" class="detail__properties">
          <h2 class="detail__section-title">Araç Özellikleri</h2>
          <div class="detail__properties-grid">
            <div
              v-for="(prop, index) in detailStore.item.properties"
              :key="index"
              class="detail__property"
            >
              <span class="detail__property-name">{{ prop.name }}</span>
              <span class="detail__property-value">{{ prop.value || '-' }}</span>
            </div>
          </div>
        </div>

        <div v-if="detailStore.item.text" class="detail__description">
          <h2 class="detail__section-title">Açıklama</h2>
          <div class="detail__text" v-html="detailStore.item.text"></div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.detail {
  padding: $spacing-4;
  max-width: 1400px;
  margin: 0 auto;

  &__back {
    display: inline-flex;
    align-items: center;
    gap: $spacing-2;
    padding: $spacing-2 $spacing-3;
    margin-bottom: $spacing-4;
    background: none;
    border: none;
    color: $color-gray-300;
    font-size: $font-size-sm;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
      color: $color-primary;
    }
  }

  &__error {
    text-align: center;
    padding: $spacing-12 $spacing-4;
    color: $color-brand-primary;
  }

  &__error-btn {
    margin-top: $spacing-4;
    padding: $spacing-3 $spacing-6;
    background: $color-brand-primary;
    color: $color-white;
    border: none;
    border-radius: $border-radius-md;
    font-size: $font-size-base;
    cursor: pointer;
  }

  &__hero {
    display: grid;
    gap: $spacing-6;
    margin-bottom: $spacing-6;

    @media (min-width: $breakpoint-lg) {
      grid-template-columns: 1fr 400px;
    }
  }

  &__slider {
    min-width: 0;
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: $spacing-5;
  }

  &__header {
    display: flex;
    flex-direction: column;
    gap: $spacing-1;
  }

  &__title {
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    color: $color-primary;
    margin: 0;

    @media (min-width: $breakpoint-md) {
      font-size: $font-size-2xl;
    }
  }

  &__model {
    font-size: $font-size-sm;
    color: $color-gray-300;
  }

  &__price {
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    color: $color-brand-primary;

    @media (min-width: $breakpoint-md) {
      font-size: $font-size-3xl;
    }
  }

  &__meta {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-4;
  }

  &__meta-item {
    display: flex;
    align-items: center;
    gap: $spacing-2;
    color: $color-gray-300;
    font-size: $font-size-sm;
  }

  &__seller {
    background: $color-white;
    padding: $spacing-4;
    border-radius: $border-radius-lg;
    border: 1px solid $color-border;
  }

  &__seller-title {
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $color-primary;
    margin: 0 0 $spacing-3;
  }

  &__seller-info {
    display: flex;
    align-items: center;
    gap: $spacing-2;
    color: $color-primary;
    font-size: $font-size-sm;
    margin-bottom: $spacing-3;
  }

  &__seller-phone {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: $spacing-2;
    width: 100%;
    padding: $spacing-3;
    background: $color-brand-primary;
    color: $color-white;
    border-radius: $border-radius-md;
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
    text-decoration: none;
    transition: background 0.2s;

    &:hover {
      background: $color-brand-primary-dark;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: $spacing-6;
  }

  &__section-title {
    font-size: $font-size-lg;
    font-weight: $font-weight-semibold;
    color: $color-primary;
    margin: 0 0 $spacing-4;
  }

  &__properties {
    background: $color-white;
    padding: $spacing-5;
    border-radius: $border-radius-lg;
    border: 1px solid $color-border;
  }

  &__properties-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-3;

    @media (min-width: $breakpoint-md) {
      grid-template-columns: repeat(4, 1fr);
    }

    @media (min-width: $breakpoint-lg) {
      grid-template-columns: repeat(5, 1fr);
    }
  }

  &__property {
    display: flex;
    flex-direction: column;
    gap: $spacing-1;
    padding: $spacing-3;
    background: $color-gray-100;
    border-radius: $border-radius-md;
  }

  &__property-name {
    font-size: $font-size-xs;
    color: $color-gray-300;
    text-transform: uppercase;
  }

  &__property-value {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $color-primary;
  }

  &__description {
    background: $color-white;
    padding: $spacing-5;
    border-radius: $border-radius-lg;
    border: 1px solid $color-border;
  }

  &__text {
    font-size: $font-size-base;
    line-height: 1.7;
    color: $color-primary;

    :deep(p) {
      margin-bottom: $spacing-3;

      &:last-child {
        margin-bottom: 0;
      }
    }

    :deep(ul),
    :deep(ol) {
      margin-bottom: $spacing-3;
      padding-left: $spacing-5;
    }
  }
}
</style>
