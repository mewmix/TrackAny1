<template>
    <li>
        <h3>{{user.fName}} {{user.lName}} / {{user.gldBrand}} {{user.gldMake}}</h3>
    </li>
</template>

<script>
export default {
    name: 'UsersListItem',
    props: {
        user: Object
    }
}
</script>