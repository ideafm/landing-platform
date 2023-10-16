#!/bin/sh
read -p "Enter registry component name: " name

##### VARIABLES #####

descFile="config.js"
vueFile="$name.vue"

##### VARIABLES #####

COMPONENT_PATH="$PWD/src/registry/$name"

if [ -d $COMPONENT_PATH ]; then
    echo "Component $name is already exist"
    exit 1
fi

mkdir "$COMPONENT_PATH"



touch "$COMPONENT_PATH/$descFile"
cat << _EOF_ >> $COMPONENT_PATH/$descFile
export default{
  name: '$name',
  description: '$name component',
  img: 'http://placehold.it/300x200',
  config: {
    fontSize: {
      name: 'Размер шрифта',
      type: 'buttons',
      values: [{
        key: 'text-sm',
        label: '14px'
      }, {
        key: 'text-lg',
        label: '18px'
      }, {
        key: 'text-3xl',
        label: 'BIG!'
      }]
    }
  }
}
_EOF_



touch "$COMPONENT_PATH/$vueFile"
cat << _EOF_ >> $COMPONENT_PATH/$vueFile
<template>
  <div>$name component template</div>
</template>

<script>
export default {
  
}
</script>
_EOF_

if [ -x "$(command -v code)" ]; then
    code $COMPONENT_PATH/$vueFile
fi