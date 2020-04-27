[instance-manager](../README.md) › [InstanceManager](instancemanager.md)

# Class: InstanceManager <**I, O**>

## Type parameters

▪ **I**: *object*

▪ **O**

## Hierarchy

* **InstanceManager**

## Index

### Constructors

* [constructor](instancemanager.md#constructor)

### Properties

* [classToIdMap](instancemanager.md#classtoidmap)
* [classToIdToInstanceMap](instancemanager.md#classtoidtoinstancemap)
* [classToInstanceCounterMap](instancemanager.md#classtoinstancecountermap)
* [classToInstanceToIdMap](instancemanager.md#classtoinstancetoidmap)
* [classToOptionsMap](instancemanager.md#classtooptionsmap)
* [idToClassMap](instancemanager.md#idtoclassmap)

### Methods

* [addClass](instancemanager.md#addclass)
* [addInstance](instancemanager.md#addinstance)
* [getClassById](instancemanager.md#getclassbyid)
* [getClassId](instancemanager.md#getclassid)
* [getClassInstance](instancemanager.md#getclassinstance)
* [getClassOptions](instancemanager.md#getclassoptions)
* [getClassOptionsById](instancemanager.md#getclassoptionsbyid)
* [getInstanceId](instancemanager.md#getinstanceid)
* [removeClass](instancemanager.md#removeclass)
* [removeClassInstance](instancemanager.md#removeclassinstance)
* [removeInstance](instancemanager.md#removeinstance)
* [resolveClass](instancemanager.md#resolveclass)
* [setClassById](instancemanager.md#setclassbyid)
* [setClassId](instancemanager.md#setclassid)
* [setClassInstance](instancemanager.md#setclassinstance)
* [setClassOptions](instancemanager.md#setclassoptions)
* [setClassOptionsById](instancemanager.md#setclassoptionsbyid)

## Constructors

###  constructor

\+ **new InstanceManager**(): *[InstanceManager](instancemanager.md)*

*Defined in [index.ts:55](https://github.com/JuroOravec/instance-manager/blob/e498de9/src/index.ts#L55)*

**Returns:** *[InstanceManager](instancemanager.md)*

## Properties

###  classToIdMap

• **classToIdMap**: *[ClassToIdMap](../README.md#classtoidmap)‹I›* = new Map()

*Defined in [index.ts:46](https://github.com/JuroOravec/instance-manager/blob/e498de9/src/index.ts#L46)*

___

###  classToIdToInstanceMap

• **classToIdToInstanceMap**: *[ClassToIdToInstanceMap](../README.md#classtoidtoinstancemap)‹I›* = new WeakMap()

*Defined in [index.ts:50](https://github.com/JuroOravec/instance-manager/blob/e498de9/src/index.ts#L50)*

___

###  classToInstanceCounterMap

• **classToInstanceCounterMap**: *[ClassToInstCounterMap](../README.md#classtoinstcountermap)‹I›* = new WeakMap()

*Defined in [index.ts:55](https://github.com/JuroOravec/instance-manager/blob/e498de9/src/index.ts#L55)*

___

###  classToInstanceToIdMap

• **classToInstanceToIdMap**: *[ClassToInstToIdMap](../README.md#classtoinsttoidmap)‹I›* = new WeakMap()

*Defined in [index.ts:53](https://github.com/JuroOravec/instance-manager/blob/e498de9/src/index.ts#L53)*

___

###  classToOptionsMap

• **classToOptionsMap**: *[ClassToOptionsMap](../README.md#classtooptionsmap)‹I, O›* = new WeakMap()

*Defined in [index.ts:48](https://github.com/JuroOravec/instance-manager/blob/e498de9/src/index.ts#L48)*

___

###  idToClassMap

• **idToClassMap**: *[IdToClassMap](../README.md#idtoclassmap)‹I›* = new Map()

*Defined in [index.ts:43](https://github.com/JuroOravec/instance-manager/blob/e498de9/src/index.ts#L43)*

## Methods

###  addClass

▸ **addClass**(`classOrInstance`: I | [Class](../README.md#class)‹I›, `options?`: O): *undefined | number*

*Defined in [index.ts:162](https://github.com/JuroOravec/instance-manager/blob/e498de9/src/index.ts#L162)*

**Parameters:**

Name | Type |
------ | ------ |
`classOrInstance` | I &#124; [Class](../README.md#class)‹I› |
`options?` | O |

**Returns:** *undefined | number*

___

###  addInstance

▸ **addInstance**(`instance`: I): *number*

*Defined in [index.ts:194](https://github.com/JuroOravec/instance-manager/blob/e498de9/src/index.ts#L194)*

**Parameters:**

Name | Type |
------ | ------ |
`instance` | I |

**Returns:** *number*

___

###  getClassById

▸ **getClassById**(`id`: number): *undefined | object*

*Defined in [index.ts:63](https://github.com/JuroOravec/instance-manager/blob/e498de9/src/index.ts#L63)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |

**Returns:** *undefined | object*

___

###  getClassId

▸ **getClassId**(`classOrInstance`: I | [Class](../README.md#class)‹I›): *undefined | number*

*Defined in [index.ts:70](https://github.com/JuroOravec/instance-manager/blob/e498de9/src/index.ts#L70)*

**Parameters:**

Name | Type |
------ | ------ |
`classOrInstance` | I &#124; [Class](../README.md#class)‹I› |

**Returns:** *undefined | number*

___

###  getClassInstance

▸ **getClassInstance**(`classOrInstance`: I | [Class](../README.md#class)‹I›, `instanceId`: number): *undefined | I*

*Defined in [index.ts:113](https://github.com/JuroOravec/instance-manager/blob/e498de9/src/index.ts#L113)*

**Parameters:**

Name | Type |
------ | ------ |
`classOrInstance` | I &#124; [Class](../README.md#class)‹I› |
`instanceId` | number |

**Returns:** *undefined | I*

___

###  getClassOptions

▸ **getClassOptions**(`classOrInstance`: I | [Class](../README.md#class)‹I›): *undefined | object & O*

*Defined in [index.ts:79](https://github.com/JuroOravec/instance-manager/blob/e498de9/src/index.ts#L79)*

**Parameters:**

Name | Type |
------ | ------ |
`classOrInstance` | I &#124; [Class](../README.md#class)‹I› |

**Returns:** *undefined | object & O*

___

###  getClassOptionsById

▸ **getClassOptionsById**(`id`: number): *undefined | object & O*

*Defined in [index.ts:85](https://github.com/JuroOravec/instance-manager/blob/e498de9/src/index.ts#L85)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |

**Returns:** *undefined | object & O*

___

###  getInstanceId

▸ **getInstanceId**(`instance`: I): *undefined | number*

*Defined in [index.ts:153](https://github.com/JuroOravec/instance-manager/blob/e498de9/src/index.ts#L153)*

**Parameters:**

Name | Type |
------ | ------ |
`instance` | I |

**Returns:** *undefined | number*

___

###  removeClass

▸ **removeClass**(`classOrInstance`: I | [Class](../README.md#class)‹I›): *boolean*

*Defined in [index.ts:182](https://github.com/JuroOravec/instance-manager/blob/e498de9/src/index.ts#L182)*

**Parameters:**

Name | Type |
------ | ------ |
`classOrInstance` | I &#124; [Class](../README.md#class)‹I› |

**Returns:** *boolean*

___

###  removeClassInstance

▸ **removeClassInstance**(`classOrInstance`: I | [Class](../README.md#class)‹I›, `instanceId`: number): *void*

*Defined in [index.ts:135](https://github.com/JuroOravec/instance-manager/blob/e498de9/src/index.ts#L135)*

**Parameters:**

Name | Type |
------ | ------ |
`classOrInstance` | I &#124; [Class](../README.md#class)‹I› |
`instanceId` | number |

**Returns:** *void*

___

###  removeInstance

▸ **removeInstance**(`instance`: I): *boolean*

*Defined in [index.ts:210](https://github.com/JuroOravec/instance-manager/blob/e498de9/src/index.ts#L210)*

**Parameters:**

Name | Type |
------ | ------ |
`instance` | I |

**Returns:** *boolean*

___

###  resolveClass

▸ **resolveClass**(`classOrInstance`: I | [Class](../README.md#class)‹I›): *object*

*Defined in [index.ts:104](https://github.com/JuroOravec/instance-manager/blob/e498de9/src/index.ts#L104)*

**Parameters:**

Name | Type |
------ | ------ |
`classOrInstance` | I &#124; [Class](../README.md#class)‹I› |

**Returns:** *object*

___

###  setClassById

▸ **setClassById**(`id`: number, `klass`: [Class](../README.md#class)‹I›): *Map‹number, object›*

*Defined in [index.ts:66](https://github.com/JuroOravec/instance-manager/blob/e498de9/src/index.ts#L66)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`klass` | [Class](../README.md#class)‹I› |

**Returns:** *Map‹number, object›*

___

###  setClassId

▸ **setClassId**(`id`: number, `classOrInstance`: I | [Class](../README.md#class)‹I›): *void*

*Defined in [index.ts:74](https://github.com/JuroOravec/instance-manager/blob/e498de9/src/index.ts#L74)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`classOrInstance` | I &#124; [Class](../README.md#class)‹I› |

**Returns:** *void*

___

###  setClassInstance

▸ **setClassInstance**(`instance`: I, `instanceId`: number): *void*

*Defined in [index.ts:119](https://github.com/JuroOravec/instance-manager/blob/e498de9/src/index.ts#L119)*

**Parameters:**

Name | Type |
------ | ------ |
`instance` | I |
`instanceId` | number |

**Returns:** *void*

___

###  setClassOptions

▸ **setClassOptions**(`classOrInstance`: I | [Class](../README.md#class)‹I›, `options`: O): *void*

*Defined in [index.ts:92](https://github.com/JuroOravec/instance-manager/blob/e498de9/src/index.ts#L92)*

**Parameters:**

Name | Type |
------ | ------ |
`classOrInstance` | I &#124; [Class](../README.md#class)‹I› |
`options` | O |

**Returns:** *void*

___

###  setClassOptionsById

▸ **setClassOptionsById**(`id`: number, `options`: O): *void*

*Defined in [index.ts:96](https://github.com/JuroOravec/instance-manager/blob/e498de9/src/index.ts#L96)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | number |
`options` | O |

**Returns:** *void*
