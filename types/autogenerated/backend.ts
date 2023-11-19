/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Obj {
  /**
   * ID Object
   * @min -2147483648
   * @max 2147483647
   */
  ID_Object: number;
  /**
   * Name Obj
   * Input name obj
   * @minLength 1
   * @maxLength 100
   */
  Name_Obj: string;
  /**
   * Region
   * Input name region
   * @minLength 1
   * @maxLength 100
   */
  Region: string;
  /**
   * Year
   * Input year opening
   * @min -2147483648
   * @max 2147483647
   */
  Year?: number;
  /**
   * Opener
   * Input name opener
   * @minLength 1
   * @maxLength 100
   */
  Opener: string;
  /**
   * Status
   * Status Obj
   */
  Status?: "del" | "ope";
  /**
   * Image Url
   * @format uri
   */
  Image_Url?: string;
}
