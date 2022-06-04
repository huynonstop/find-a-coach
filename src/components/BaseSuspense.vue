<template>
  <Suspense>
    <template #default>
      <slot></slot>
    </template>
    <template #fallback>
      <BaseDialog :fixed="true" :show="true" title="Authenticating...">
        <BaseSpinner></BaseSpinner>
      </BaseDialog>
    </template>
  </Suspense>
</template>
