/**
 * Mapper function that helps you map object a to object b e.g. when you want to decouple your front- and back-end models
 * @example
 * // By default it maps all properties that match
 * mapper<Source, Target>(source);
 * @example
 * // When you want to map properties that do not match, you can provide your own custom mapping
 * mapper<Source,Target>(source, { propertyX: "propertyY" });
 * @param source
 * @param propertyMap
 */
export const mapper = <TSource extends object,
  TTarget extends object>(source: TSource,
                          propertyMap?: { [ key in keyof TSource]?: keyof TTarget})
  : TTarget =>
{ 
    const target = {} as TTarget;   
    for (const key in source) {

      if (Object.hasOwn(source, key)) {
        const targetKey = propertyMap ? propertyMap[key] || key : key; 
        (target as any)[targetKey as keyof TTarget] = source[key];
      }
    }
    return target;
};
