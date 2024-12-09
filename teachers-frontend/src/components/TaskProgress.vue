<template>
    <div>
        <OverlayBadge value="ABC">
            <Avatar label="100" shape="circle" size="xlarge" />
        </OverlayBadge>
    </div>
    <OverlayBadge value="4" severity="danger" class="inline-flex">
        <Avatar class="p-overlay-badge" image="https://primefaces.org/cdn/primevue/images/organization/walter.jpg" size="xlarge" />
    </OverlayBadge>
</template>

<script lang="ts" setup>
    import Avatar from 'primevue/avatar';
    import OverlayBadge from 'primevue/overlaybadge';
</script>