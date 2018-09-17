/*******************************************************************************
 * Utility functions
 * Rebuild in Typescript
 ******************************************************************************/


 /**
  * Is this a valid entry type?
  *
  * @param {any} entryType The data to validate as an expected entryType.
  * @return {boolean} true if the passed argument is a valid entryType.
  */
 export const isValidEntryType = (entryType: string ):boolean =>{
     // Add additonal entry types here as they are added to dna.json.
     return ["sampleEntry"].includes(entryType);
 }
   
 /**
  * Returns the creator of an entity, given an entity hash.
  *
  * @param  {string} hash The entity hash.
  * @return {string} The agent hash of the entity creator.
  */
 export const getCreator = (hash: string):string => {
     return get(hash, { GetMask: HC.GetMask.Sources })[0];
 }
   
   /*******************************************************************************
    * Required callbacks
    ******************************************************************************/
   
   /**
    * System genesis callback: Can the app start?
    *
    * Executes just after the initial genesis entries are committed to your chain
    * (1st - DNA entry, 2nd Identity entry). Enables you specify any additional
    * operations you want performed when a node joins your holochain.
    *
    * @return {boolean} true if genesis is successful and so the app may start.
    *
    * @see https://developer.holochain.org/API#genesis
    */
   export const genesis =():boolean=>{
     return true;
   }
   
   /**
    * Validation callback: Can this entry be committed to a source chain?
    *
    * @param  {string} entryType Type of the entry as per DNA config for this zome.
    * @param  {string|object} entry Data with type as per DNA config for this zome.
    * @param  {Header-object} header Header object for this entry.
    * @param  {Package-object|null} pkg Package object for this entry, if exists.
    * @param  {string[]} sources Array of agent hashes involved in this commit.
    * @return {boolean} true if this entry may be committed to a source chain.
    *
    * @see https://developer.holochain.org/API#validateCommit_entryType_entry_header_package_sources
    * @see https://developer.holochain.org/Validation_Functions
    */
   export const validateCommit
   =(entryType:string, entry:object|string, header:Header, pkg:Package|null, sources:string[]):boolean=>{
     return isValidEntryType(entryType);
   }
   
   /**
    * Validation callback: Can this entry be committed to the DHT on any node?
    *
    * It is very likely that this validation routine should check the same data
    * integrity as validateCommit, but, as it happens during a different part of
    * the data life-cycle, it may require additional validation steps.
    *
    * This function will only get called on entry types with "public" sharing, as
    * they are the only types that get put to the DHT by the system.
    *
    * @param  {string} entryType Type of the entry as per DNA config for this zome.
    * @param  {string|object} entry Data with type as per DNA config for this zome.
    * @param  {Header-object} header Header object for this entry.
    * @param  {Package-object|null} pkg Package object for this entry, if exists.
    * @param  {string[]} sources Array of agent hashes involved in this commit.
    * @return {boolean} true if this entry may be committed to the DHT.
    *
    * @see https://developer.holochain.org/API#validatePut_entryType_entry_header_package_sources
    * @see https://developer.holochain.org/Validation_Functions
    */
   export const validatePut
   =(entryType: string, entry:string|object, header:Header, pkg:Package|null, sources:string[]):boolean=>{
     return validateCommit(entryType, entry, header, pkg, sources);
   }
   
   /**
    * Validation callback: Can this entry be modified?
    *
    * Validate that this entry can replace 'replaces' due to 'mod'.
    *
    * @param  {string} entryType Type of the entry as per DNA config for this zome.
    * @param  {string|object} entry Data with type as per DNA config for this zome.
    * @param  {Header-object} header Header object for this entry.
    * @param  {string} replaces The hash string of the entry being replaced.
    * @param  {Package-object|null} pkg Package object for this entry, if exists.
    * @param  {string[]} sources Array of agent hashes involved in this mod.
    * @return {boolean} true if this entry may replace 'replaces'.
    *
    * @see https://developer.holochain.org/API#validateMod_entryType_entry_header_replaces_package_sources
    * @see https://developer.holochain.org/Validation_Functions
    */
   export const validateMod
   =(entryType:string , entry:string|object, header:Header, replaces:string, pkg:Package|null, sources:string[]):boolean=>{
     return validateCommit(entryType, entry, header, pkg, sources) && getCreator(header.EntryLink) === getCreator(replaces);
   }
   
   /**
    * Validation callback: Can this entry be deleted?
    *
    * @param  {string} entryType Name of the entry as per DNA config for this zome.
    * @param  {string} hash The hash of the entry to be deleted.
    * @param  {Package-object|null} pkg Package object for this entry, if exists.
    * @param  {string[]} sources Array of agent hashes involved in this delete.
    * @return {boolean} true if this entry can be deleted.
    *
    * @see https://developer.holochain.org/API#validateDel_entryType_hash_package_sources
    * @see https://developer.holochain.org/Validation_Functions
    */
   export const validateDel=(entryType:string, hash:string, pkg:Package|null, sources:string[]):boolean=>{
     return isValidEntryType(entryType) && getCreator(hash) === sources[0];
   }
   
   /**
    * Package callback: The package request for validateCommit() and valdiatePut().
    *
    * Both 'commit' and 'put' trigger 'validatePutPkg' as 'validateCommit' and
    * 'validatePut' must both have the same data.
    *
    * @param  {string} entryType Name of the entry as per DNA config for this zome.
    * @return {PkgReq-object|null}
    *   null if the data required is the Entry and Header.
    *   Otherwise a "Package Request" object, which specifies what data to be sent
    *   to the validating node.
    *
    * @see https://developer.holochain.org/API#validatePutPkg_entryType
    * @see https://developer.holochain.org/Validation_Packaging
    */
   export const validatePutPkg=(entryType:string):Package|null=> {
     return null;
   }
   
   /**
    * Package callback: The package request for validateMod().
    *
    * @param  {string} entryType Name of the entry as per DNA config for this zome.
    * @return {PkgReq-object|null}
    *   null if the data required is the Entry and Header.
    *   Otherwise a "Package Request" object, which specifies what data to be sent
    *   to the validating node.
    *
    * @see https://developer.holochain.org/API#validateModPkg_entryType
    * @see https://developer.holochain.org/Validation_Packaging
    */
   export const validateModPkg=(entryType:string):Package|null=>{
     return null;
   }
   
   /**
    * Package callback: The package request for validateDel().
    *
    * @param  {string} entryType Name of the entry as per DNA config for this zome.
    * @return {PkgReq-object|null}
    *   null if the data required is the Entry and Header.
    *   Otherwise a "Package Request" object, which specifies what data to be sent
    *   to the validating node.
    *
    * @see https://developer.holochain.org/API#validateDelPkg_entryType
    * @see https://developer.holochain.org/Validation_Packaging
    */
   export const validateDelPkg=(entryType:string):Package|null=>{
     return null;
   }