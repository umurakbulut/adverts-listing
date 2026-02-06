<script setup lang="ts">
import { computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps<{
  currentPage: number
  itemCount: number
  pageSize: number
}>()

const emit = defineEmits<{
  pageChange: [page: number]
}>()

const hasPrevious = computed(() => props.currentPage > 1)
const hasNext = computed(() => props.itemCount === props.pageSize)

const handlePrevious = () => {
  if (hasPrevious.value) {
    emit('pageChange', props.currentPage - 1)
  }
}

const handleNext = () => {
  if (hasNext.value) {
    emit('pageChange', props.currentPage + 1)
  }
}
</script>

<template>
  <nav v-if="hasPrevious || hasNext" class="pagination">
    <button class="pagination__btn" :disabled="!hasPrevious" @click="handlePrevious">
      <ChevronLeft :size="20" />
      <span>Önceki</span>
    </button>

    <span class="pagination__current">{{ currentPage }}</span>

    <button class="pagination__btn" :disabled="!hasNext" @click="handleNext">
      <span>Sonraki</span>
      <ChevronRight :size="20" />
    </button>
  </nav>
</template>

<style scoped lang="scss">
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $spacing-4;
  margin-top: $spacing-8;

  &__btn {
    display: inline-flex;
    align-items: center;
    gap: $spacing-1;
    padding: $spacing-3 $spacing-4;
    background: $color-white;
    border: 1px solid $color-border;
    border-radius: $border-radius-md;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $color-primary;
    cursor: pointer;
    transition: all 0.2s;

    &:hover:not(:disabled) {
      border-color: $color-brand-primary;
      color: $color-brand-primary;
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  &__current {
    min-width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $color-brand-primary;
    color: $color-white;
    border-radius: $border-radius-md;
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
  }
}
</style>
