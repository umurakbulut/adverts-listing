<script setup lang="ts">
import { ref, watch } from 'vue'
import { X } from 'lucide-vue-next'
import { SortType, SortDirection } from '@/types'
import type { IListingFilter } from '@/types'

const props = defineProps<{
  isOpen: boolean
  currentFilters: IListingFilter
}>()

const emit = defineEmits<{
  close: []
  apply: [filters: IListingFilter]
}>()

const filters = ref<IListingFilter>({ ...props.currentFilters })

watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      filters.value = { ...props.currentFilters }
    }
  },
)

const handleApply = () => {
  emit('apply', { ...filters.value })
  emit('close')
}

const handleReset = () => {
  filters.value = {
    take: 20,
    skip: 0,
    sort: SortType.Date,
    sortDirection: SortDirection.Descending,
    minDate: undefined,
    maxDate: undefined,
    minYear: undefined,
    maxYear: undefined,
  }
}

const handleOverlayClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget) {
    emit('close')
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="modal-overlay" @click="handleOverlayClick">
        <div class="modal">
          <header class="modal__header">
            <h2 class="modal__title">Filtreler</h2>
            <button class="modal__close" @click="$emit('close')">
              <X :size="24" />
            </button>
          </header>

          <div class="modal__body">
            <div class="filter-group">
              <label class="filter-group__label">İlan Tarihi</label>
              <div class="filter-group__row">
                <input
                  v-model="filters.minDate"
                  type="date"
                  class="filter-input"
                  placeholder="Min"
                />
                <input
                  v-model="filters.maxDate"
                  type="date"
                  class="filter-input"
                  placeholder="Max"
                />
              </div>
            </div>

            <div class="filter-group">
              <label class="filter-group__label">Model Yılı</label>
              <div class="filter-group__row">
                <input
                  v-model.number="filters.minYear"
                  type="number"
                  class="filter-input"
                  placeholder="Min"
                  min="1900"
                  max="2030"
                />
                <input
                  v-model.number="filters.maxYear"
                  type="number"
                  class="filter-input"
                  placeholder="Max"
                  min="1900"
                  max="2030"
                />
              </div>
            </div>

            <div class="filter-group">
              <label class="filter-group__label">Sıralama</label>
              <div class="filter-group__row">
                <select v-model.number="filters.sort" class="filter-input">
                  <option :value="SortType.Date">Tarih</option>
                  <option :value="SortType.Price">Fiyat</option>
                  <option :value="SortType.Year">Yıl</option>
                </select>
                <select v-model.number="filters.sortDirection" class="filter-input">
                  <option :value="SortDirection.Descending">Azalan</option>
                  <option :value="SortDirection.Ascending">Artan</option>
                </select>
              </div>
            </div>
          </div>

          <footer class="modal__footer">
            <button class="btn btn--secondary" @click="handleReset">Sıfırla</button>
            <button class="btn btn--primary" @click="handleApply">Uygula</button>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: $spacing-4;
}

.modal {
  background: $color-white;
  border-radius: $border-radius-lg;
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: $spacing-4 $spacing-5;
    border-bottom: 1px solid $color-border;
  }

  &__title {
    font-size: $font-size-xl;
    font-weight: $font-weight-semibold;
    margin: 0;
  }

  &__close {
    background: none;
    border: none;
    cursor: pointer;
    color: $color-gray-300;
    padding: $spacing-1;
    display: flex;
    transition: color 0.2s;

    &:hover {
      color: $color-primary;
    }
  }

  &__body {
    padding: $spacing-5;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: $spacing-5;
  }

  &__footer {
    display: flex;
    gap: $spacing-3;
    padding: $spacing-4 $spacing-5;
    border-top: 1px solid $color-border;
  }
}

.filter-group {
  &__label {
    display: block;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $color-primary;
    margin-bottom: $spacing-2;
  }

  &__row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: $spacing-3;
  }
}

.filter-input {
  width: 100%;
  padding: $spacing-3;
  border: 1px solid $color-border;
  border-radius: $border-radius-md;
  font-size: $font-size-base;
  color: $color-primary;
  background: $color-white;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: $color-brand-primary;
  }

  &::placeholder {
    color: $color-gray-300;
  }
}

.btn {
  flex: 1;
  padding: $spacing-3 $spacing-4;
  border-radius: $border-radius-md;
  font-size: $font-size-base;
  font-weight: $font-weight-medium;
  cursor: pointer;
  transition: all 0.2s;

  &--primary {
    background: $color-brand-primary;
    color: $color-white;
    border: none;

    &:hover {
      background: $color-brand-primary-dark;
    }
  }

  &--secondary {
    background: $color-white;
    color: $color-primary;
    border: 1px solid $color-border;

    &:hover {
      background: $color-gray-100;
    }
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;

  .modal {
    transition: transform 0.2s ease;
  }
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;

  .modal {
    transform: scale(0.95);
  }
}
</style>
