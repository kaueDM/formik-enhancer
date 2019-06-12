# formik-enhancer

[![Latest Stable Version](https://img.shields.io/npm/v/formik-enhancer.svg?style=for-the-badge)](https://www.npmjs.com/package/formik-enhancer)
[![License](https://img.shields.io/npm/l/formik-enhancer.svg?style=for-the-badge)](https://www.npmjs.com/package/formik-enhancer)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=for-the-badge)](https://standardjs.com)
![npm type definitions](https://img.shields.io/npm/types/typescript.svg?style=for-the-badge)
![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/kaueDM/formik-enhancer.svg?style=for-the-badge)

### Cut the boilerplate, keep what matters.

## Instalation
`yarn add formik-enhancer`

For validations, install **Yup**

`yarn add yup`

## Usage

```
import formikEnhancer from 'formik-enhancer'

formikEnhancer({ config, values, schema })
```
**❗`formik-enhancer` sets `enableReinitialize` to `true` by default.** If you have external _things_ that can change your form values, this will keep it up-to-date.

### **`config: Record<string, any>`**

| Prop       | Description | Default |
| ---------- |-------------| --------|
| `onSubmit` | **[REQUIRED]** Form submit method. Receives current form values as parameter. | _None_ |
| `children` | Any React component you want to render. Receives `Formik` props, so you can do whatever you want. | _None_ |


### **`values?: Record<string, any>`**

An object containing new values for the form. If you want to load data from an API or
something like that, this is your guy.Values inside this prop will overwrite `initialValue`
from `schema` fields.

### **`schema: Array<Record<string, any>>`**

**generic props:**

| Prop           | Description | Default |
| -------------- |-------------| --------|
| `name`         | **[REQUIRED]** Field name. `formik-enhancer` will use it to keep track of everything. | _None_ |
| `type`         | Input type. Can be `text` or `select` (more types coming soon). In the web, you can use `password` or `email` too. | `text` |
| `placeholder`  | Text to display while your input dont have a value. | _None_ |
| `initialValue` | Initial input value. | `''` |
| `validation`   | Check [Yup docs](https://github.com/jquense/yup) | _None_ |
| `component`    | **[REQUIRED]** As the name indicates, the input component you want to render. | _None_ |
| `blurEvent`    | Custom `onBlur` event. | _None_ |
| `changeEvent`  | Custom `onChange` event. Receives the input value as parameter. | _None_ |

**native-only props:**

| Prop           | Description | Default |
| -------------- |-------------| --------|
| `secure`       | Boolean that represents if it's an secure field (for passwords, etc). | `false` |

**`select` type props:**

| Prop           | Description | Default |
| -------------- |-------------| --------|
| `items`        | **[REQUIRED]** An Array of possible options for your select input. Should have at least two keys, `label` and `value`,  e.g. `{ label: 'Foo', value: 'foo_option' }`  | _None_ |
| `renderItem` | **[REQUIRED]** A function that returns a component (more details below). | _None_ |

```
//renderItem will always receive two props: `option` and `index`
// `option` is one of `items` entry
// `index` is the index of `option` in `items`

// React
const _renderItem = (option, index) => {
  return <option key={index} value={option.value}>{option.label}</option>
}

// React Native
const _renderItem = (option, index) => {
  return <Picker.Item key={index} label={option.label} value={option.value} />
}
```

Besides this props, you can pass **anything you want as a prop.** Just be sure to
keep track of what you doing.

Every `field` will receive two extra props: `error` and `touched`. This props values
are managed by `formik-enhancer` and you can use it to render validation errors, etc.

## Example

```js
// Form schema. Based on this array, formik-enhancer will build your form.
const schema = [
  {
    name: 'user',
    label: 'Choose your username',
    placeholder: 'e.g. JohnDoe',
    initialValue: 'Foo', 
    validation: Yup.string().required('Required field'),
    component: TextField
  },
  {
    type: 'select',
    name: 'favoriteColor',
    label: 'What is your favorite color?',
    placeholder: { label: 'Select...' },
    validation: Yup.string().required('Required field'),
    component: SelectField,
    items: [{ label: 'Red', value: 'red' }],
    renderItem: (option, index) => _renderItem(option, index)
  },
  {
    secure: true, // this prop is valid only in React Native. Check the props tables above.
    name: 'password',
    label: 'Inform your password',
    placeholder: 'Use at least 8 characters',
    validation: Yup.string().min(8, 'Too short!').required('Required field'),
    component: TextField
    blurEvent: _ => console.log('This is my custom blur event!')
  }
]
```

```jsx
// Configuration object. For now, have only this 2 props, onSubmit and children.
// Consider it a WIP.
// More details in the config props table.
const config = {
  onSubmit: values => console.log('Submitted form: ', values),
  children: formikProps => (
    <React.Fragment>
        <Button
          title='Reset'
          type='outline'
          onPress={_ => formikProps.resetForm()}
          containerStyle={{ width: '40%', marginTop: 15, marginRight: 7.5 }}
        />
    </React.Fragment>
  )
}
```

```jsx
import * as Yup from 'yup'
import { Picker } from 'react-native'
import formikEnhancer from 'formik-enhancer'
// You can use any component you want. 
// In this example, we use React Native Elements.
import { Input, Button } from 'react-native-elements'

export default SomeClass extends React.Component {
  render () {
    return (
      <React.Fragment>
        {formikEnhancer({ schema, config })}
      </React.Fragment>
    )
  }
}

// Fields for our form :)
const TextField = ({ ...props }) => (
  <Input
    {...props}
    errorStyle={{ color: 'red' }}
    errorMessage={props.touched && props.error ? props.error : ''}
  />
)

const SelectField = ({ ...props }) => (
  <React.Fragment>
    <Text>{props.label}</Text>
    <Picker {...props} />
    {props.error &&
      props.touched &&
      <Text style={{ color: 'red' }}>{props.error}</Text>}
  </React.Fragment>
)
```
