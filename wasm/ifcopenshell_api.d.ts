// This file was generated with the assistance of an AI coding tool.

declare module 'ifcopenshell-api' {
  export type IfcOpenshellRawValue = null | boolean | number | bigint | string | object | IfcOpenshellRawValue[];
  export const IfcOpenShellErrorKind: {
    readonly NONE: 0;
    readonly RUNTIME: 1;
    readonly VALUE: 2;
    readonly TYPE: 3;
    readonly NOT_IMPLEMENTED: 4;
    readonly KEY: 5;
    readonly RECURSION: 6;
    readonly CANCELLED: 7;
  };
  export type IfcOpenShellErrorKind = typeof IfcOpenShellErrorKind[keyof typeof IfcOpenShellErrorKind];
  export const IfcOpenShellErrorCode: {
    readonly NONE: 0;
    readonly UNSPECIFIED: 1;
    readonly INVALID_ARGUMENT: 2;
    readonly DOMAIN_ERROR: 3;
    readonly INVALID_QUADRANT_BEARING: 100;
    readonly UNSUPPORTED_RESOURCE_QUANTITY: 101;
    readonly INVALID_RESOURCE_QUANTITY_CLASS: 102;
    readonly RECURSIVE_SCHEDULE_CASCADE: 103;
    readonly CYCLIC_TASK_GRAPH: 104;
    readonly OPERATION_CANCELLED: 105;
  };
  export type IfcOpenShellErrorCode = typeof IfcOpenShellErrorCode[keyof typeof IfcOpenShellErrorCode];
  /** Kinds and codes are stable identifiers. Message is diagnostic only. */
  export class IfcOpenShellError extends Error {
    readonly kind: IfcOpenShellErrorKind;
    readonly code: IfcOpenShellErrorCode;
    constructor(message: string, cause?: unknown);
    constructor(kind: IfcOpenShellErrorKind, code: IfcOpenShellErrorCode, message: string, cause?: unknown);
  }
  export function abortError(message?: string, cause?: unknown): IfcOpenShellError;
  export function isIfcOpenShellAbortError(error: unknown): error is IfcOpenShellError;
  export type IfcOpenshellNumericTypedArray = Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array;
  export interface IfcOpenshellNumericArrayConstructor<T extends IfcOpenshellNumericTypedArray> {
    readonly BYTES_PER_ELEMENT: number;
    new (arrayLike: ArrayLike<number>): T;
  }

  export interface IfcOpenshellAlignmentCreateLayoutSegmentResult {
    segment: IfcOpenshellInstance;
    endpoint: number[];
    has_endpoint: boolean;
  }

  export interface IfcOpenshellGeometryRailingSupport {
    arc_polyline: number[][];
    arc_radius: number;
    disk_position: number[];
    disk_radius: number;
    disk_depth: number;
    disk_z_rotation: number;
  }

  export interface IfcOpenshellGeometryWallMountedHandrailResult {
    handrail_polyline: number[][];
    handrail_arc_point_indices: number[];
    handrail_radius: number;
    supports: IfcOpenshellGeometryRailingSupport[];
  }

  export interface IfcOpenshellProjectAppendAssetCacheEntry {
    source_identities: bigint[];
    source_ids: bigint[];
    source_types: string[];
    targets: IfcOpenshellParseInstanceList;
  }

  export interface IfcOpenshellSequenceDuplicateTaskResult {
    current: IfcOpenshellParseInstanceList;
    duplicate: IfcOpenshellParseInstanceList;
  }

  export interface IfcOpenshellShapeBuilderMepBendShapeResult {
    representation: IfcOpenshellInstance;
    start_length: number;
    end_length: number;
    radius: number;
    angle: number;
    lateral_axis: number;
    lateral_sign: number;
    z_axis_sign: number;
    main_profile_dimension: number;
  }

  export interface IfcOpenshellShapeBuilderMepTransitionShapeResult {
    representation: IfcOpenshellInstance;
    start_length: number;
    end_length: number;
    angle: number;
    profile_offset: number[];
    transition_length: number;
    full_transition_length: number;
  }

  export type BoundaryInternalOrExternal = 'INTERNAL' | 'EXTERNAL' | 'EXTERNAL_EARTH' | 'EXTERNAL_WATER' | 'EXTERNAL_FIRE' | 'NOTDEFINED';
  export type BoundaryPhysicalOrVirtual = 'PHYSICAL' | 'VIRTUAL' | 'NOTDEFINED';
  export type Dimensions7 = [number, number, number, number, number, number, number];
  export type GeometryBooleanOperator = 'DIFFERENCE' | 'INTERSECTION' | 'UNION';
  export type GeometryDirectionSense = 'POSITIVE' | 'NEGATIVE';
  export type GeometryDoorOperationType = 'SINGLE_SWING_LEFT' | 'SINGLE_SWING_RIGHT' | 'DOUBLE_SWING_RIGHT' | 'DOUBLE_SWING_LEFT' | 'DOUBLE_DOOR_SINGLE_SWING' | 'DOUBLE_DOOR_DOUBLE_SWING' | 'SLIDING_TO_LEFT' | 'SLIDING_TO_RIGHT' | 'DOUBLE_DOOR_SLIDING';
  export type GeometryPathConnectionType = 'ATSTART' | 'ATEND' | 'ATPATH' | 'NOTDEFINED';
  export type GeometryRailingTerminalType = '180' | 'TO_END_POST' | 'TO_WALL' | 'TO_FLOOR' | 'TO_END_POST_AND_FLOOR' | 'NONE';
  export type GeometryWindowPartitionType = 'SINGLE_PANEL' | 'DOUBLE_PANEL_HORIZONTAL' | 'DOUBLE_PANEL_VERTICAL' | 'TRIPLE_PANEL_BOTTOM' | 'TRIPLE_PANEL_HORIZONTAL' | 'TRIPLE_PANEL_LEFT' | 'TRIPLE_PANEL_RIGHT' | 'TRIPLE_PANEL_TOP' | 'TRIPLE_PANEL_VERTICAL';
  export type PlacementRotationAxis = 'X' | 'Y' | 'Z';
  export type StructuralGlobalOrLocal = 'GLOBAL_COORDS' | 'LOCAL_COORDS';
  export type StyleUvMode = 'Generated' | 'Camera' | 'UV';
  export type SystemFlowDirection = 'SOURCE' | 'SINK' | 'SOURCEANDSINK' | 'NOTDEFINED';
  export type filetype = 'FT_IFCSPF' | 'FT_IFCXML' | 'FT_IFCZIP' | 'FT_ROCKSDB' | 'FT_UNKNOWN' | 'FT_AUTODETECT';
  export type kinds = 'MATRIX4' | 'POINT3' | 'DIRECTION3' | 'LINE' | 'CIRCLE' | 'ELLIPSE' | 'BSPLINE_CURVE' | 'OFFSET_CURVE' | 'PLANE' | 'CYLINDER' | 'SPHERE' | 'TORUS' | 'BSPLINE_SURFACE' | 'EDGE' | 'LOOP' | 'FACE' | 'SHELL' | 'SOLID' | 'LOFT' | 'EXTRUSION' | 'REVOLVE' | 'SWEEP_ALONG_CURVE' | 'NODE' | 'COLLECTION' | 'BOOLEAN_RESULT' | 'FUNCTION_ITEM' | 'FUNCTOR_ITEM' | 'PIECEWISE_FUNCTION' | 'GRADIENT_FUNCTION' | 'CANT_FUNCTION' | 'OFFSET_FUNCTION' | 'COLOUR' | 'STYLE';
  export type operation_t = 'UNION' | 'SUBTRACTION' | 'INTERSECTION';
  export type read_type = 'READ_BREP' | 'READ_TRIANGULATION';
  export type tree_point = [number, number, number];

  export interface IfcOpenshellAggregateAssignObjectOptions {
    products: IfcOpenshellParseInstanceList;
    relating_object: IfcOpenshellInstance;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellAggregateUnassignObjectOptions {
    products: IfcOpenshellParseInstanceList;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellAlignmentAddStationingReferentOptions {
    alignment: IfcOpenshellInstance;
    distance_along: number;
    station: number;
    name: string;
    positioned_product: IfcOpenshellInstance;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellAlignmentCreateByPiMethodOptions {
    name: string;
    horizontal: IfcOpenshellAlignmentHorizontalPiLayout;
    vertical?: IfcOpenshellAlignmentVerticalPiLayout;
    start_station?: number;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellAlignmentCreateFromCsvTextOptions {
    csv_text: string;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellAlignmentCreateOffsetCurveOptions {
    name: string;
    offsets: IfcOpenshellParseInstanceList;
    start_station?: number;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellAlignmentCreateOptions {
    name: string;
    include_vertical?: boolean;
    include_cant?: boolean;
    include_geometry?: boolean;
    start_station?: number;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellAlignmentCreatePolylineOptions {
    name: string;
    points: IfcOpenshellParseInstanceList;
    start_station?: number;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellAlignmentHorizontalPiLayout {
    start_point: [number, number];
    intersections: IfcOpenshellAlignmentHorizontalPi[];
    end_point: [number, number];
  }

  export interface IfcOpenshellAlignmentHorizontalPi {
    point: [number, number];
    radius: number;
  }

  export interface IfcOpenshellAlignmentLayoutHorizontalByPiMethodOptions {
    pis: IfcOpenshellAlignmentHorizontalPiLayout;
  }

  export interface IfcOpenshellAlignmentLayoutVerticalByPiMethodOptions {
    pis: IfcOpenshellAlignmentVerticalPiLayout;
  }

  export interface IfcOpenshellAlignmentMapSegmentOptions {
    segment: IfcOpenshellInstance;
    rail_head_distance?: number;
  }

  export interface IfcOpenshellAlignmentVerticalPiLayout {
    start_point: [number, number];
    intersections: IfcOpenshellAlignmentVerticalPi[];
    end_point: [number, number];
  }

  export interface IfcOpenshellAlignmentVerticalPi {
    point: [number, number];
    curve_length: number;
  }

  export interface IfcOpenshellAttributeEditAttributesOptions {
    product: IfcOpenshellInstance;
    attributes: number;
    sync_predefined_type: boolean;
    update_owner_history: boolean;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellBoundaryAssignConnectionGeometryOptions {
    outer_boundary: [number, number][];
    location: [number, number, number];
    axis: [number, number, number];
    ref_direction: [number, number, number];
    inner_boundaries?: [number, number][][];
    unit_scale?: number;
  }

  export interface IfcOpenshellBoundaryEditAttributesOptions {
    relating_space: IfcOpenshellInstance;
    related_building_element: IfcOpenshellInstance;
    parent_boundary?: IfcOpenshellInstance;
    corresponding_boundary?: IfcOpenshellInstance;
    physical_or_virtual: BoundaryPhysicalOrVirtual;
    internal_or_external: BoundaryInternalOrExternal;
  }

  export interface IfcOpenshellClassificationAddReferenceOptions {
    products: IfcOpenshellParseInstanceList;
    reference?: IfcOpenshellInstance;
    identification?: string;
    name?: string;
    classification?: IfcOpenshellInstance;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellClassificationRemoveReferenceOptions {
    reference: IfcOpenshellInstance;
    products: IfcOpenshellParseInstanceList;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellCogoAddSurveyPointOptions {
    survey_point: IfcOpenshellInstance;
    site?: IfcOpenshellInstance;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellConstraintAssignConstraintOptions {
    products: IfcOpenshellParseInstanceList;
    constraint: IfcOpenshellInstance;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellConstraintUnassignConstraintOptions {
    products: IfcOpenshellParseInstanceList;
    constraint: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellContextAddContextOptions {
    context_type: string;
    context_identifier: string;
    target_view: string;
    target_scale?: number;
    parent?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellControlAssignControlOptions {
    relating_control: IfcOpenshellInstance;
    related_objects: IfcOpenshellParseInstanceList;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellControlUnassignControlOptions {
    relating_control: IfcOpenshellInstance;
    related_objects: IfcOpenshellParseInstanceList;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellCostAddCostItemOptions {
    cost_schedule?: IfcOpenshellInstance;
    cost_item?: IfcOpenshellInstance;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellCostAssignCostItemQuantityOptions {
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellCostCopyCostScheduleOptions {
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellCostEditCostValueOptions {
    edit_unit_basis?: boolean;
    clear_unit_basis?: boolean;
    value_component?: number;
    unit_component?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellCostUnassignCostItemQuantityOptions {
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellDocumentAddInformationOptions {
    parent?: IfcOpenshellInstance;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellDocumentAssignDocumentOptions {
    products: IfcOpenshellParseInstanceList;
    document: IfcOpenshellInstance;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellDocumentUnassignDocumentOptions {
    products: IfcOpenshellParseInstanceList;
    document: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellDrawingAssignProductOptions {
    relating_product: IfcOpenshellInstance;
    related_object: IfcOpenshellInstance;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellDrawingUnassignProductOptions {
    relating_product: IfcOpenshellInstance;
    related_object: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellElementGetContainerOptions {
    direct_only?: boolean;
    ifc_class?: string;
  }

  export interface IfcOpenshellElementGetDecompositionOptions {
    is_recursive?: boolean;
  }

  export interface IfcOpenshellElementGetMaterialOptions {
    should_skip_usage?: boolean;
    should_inherit?: boolean;
  }

  export interface IfcOpenshellElementGetPsetIdsOptions {
    psets_only?: boolean;
    qtos_only?: boolean;
    should_inherit?: boolean;
  }

  export interface IfcOpenshellElementGetShapeAspectsOptions {
    should_inherit?: boolean;
  }

  export interface IfcOpenshellEntityRemoveDeepOptions {
    also_consider: IfcOpenshellParseInstanceList;
    do_not_delete: IfcOpenshellParseInstanceList;
  }

  export interface IfcOpenshellFeatureAddFeatureOptions {
    feature: IfcOpenshellInstance;
    element: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellFeatureRemoveFeatureOptions {
    feature: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellGeometryAddDoorRepresentationOptions {
    context: IfcOpenshellInstance;
    overall_height?: number;
    overall_width?: number;
    operation_type?: GeometryDoorOperationType;
    lining_properties?: IfcOpenshellGeometryDoorLiningProperties;
    panel_properties?: IfcOpenshellGeometryDoorPanelProperties;
    part_of_product?: IfcOpenshellInstance;
    unit_scale?: number;
  }

  export interface IfcOpenshellGeometryAddMeshRepresentationOptions {
    items: IfcOpenshellGeometryMeshItem[];
    coordinate_offset?: [number, number, number];
    unit_scale?: number;
    force_faceted_brep?: boolean;
  }

  export interface IfcOpenshellGeometryAddProfileRepresentationOptions {
    context: IfcOpenshellInstance;
    profile: IfcOpenshellInstance;
    depth?: number;
    cardinal_point?: string;
    placement_z_axis?: [number, number, number];
    placement_x_axis?: [number, number, number];
    clippings?: (IfcOpenshellGeometryPlaneClipping | IfcOpenshellGeometryEntityClipping)[];
  }

  export interface IfcOpenshellGeometryAddRailingRepresentationOptions {
    context: IfcOpenshellInstance;
    railing_path?: [number, number, number][];
    use_manual_supports?: boolean;
    support_spacing?: number;
    railing_diameter?: number;
    clear_width?: number;
    terminal_type?: GeometryRailingTerminalType;
    height?: number;
    looped_path?: boolean;
    unit_scale?: number;
  }

  export interface IfcOpenshellGeometryAddShapeAspectOptions {
    name: string;
    items: IfcOpenshellParseInstanceList;
    representation: IfcOpenshellInstance;
    part_of_product: IfcOpenshellInstance;
    description?: string;
  }

  export interface IfcOpenshellGeometryAddSlabRepresentationOptions {
    context: IfcOpenshellInstance;
    depth?: number;
    direction_sense?: GeometryDirectionSense;
    offset?: number;
    x_angle?: number;
    clippings?: (IfcOpenshellGeometryPlaneClipping | IfcOpenshellGeometryEntityClipping)[];
    polyline?: number[][];
  }

  export interface IfcOpenshellGeometryAddTopologyRepresentationOptions {
    context: IfcOpenshellInstance;
    item: IfcOpenshellInstance;
    representation_identifier?: string;
    representation_type?: string;
  }

  export interface IfcOpenshellGeometryAddWallRepresentationOptions {
    context: IfcOpenshellInstance;
    length?: number;
    height?: number;
    direction_sense?: GeometryDirectionSense;
    offset?: number;
    thickness?: number;
    x_angle?: number;
    clippings?: (IfcOpenshellGeometryPlaneClipping | IfcOpenshellGeometryEntityClipping)[];
    booleans?: IfcOpenshellParseInstanceList;
  }

  export interface IfcOpenshellGeometryAddWindowRepresentationOptions {
    context: IfcOpenshellInstance;
    overall_height?: number;
    overall_width?: number;
    partition_type?: GeometryWindowPartitionType;
    lining_properties?: IfcOpenshellGeometryWindowLiningProperties;
    panel_properties?: IfcOpenshellGeometryWindowPanelProperties[];
    part_of_product?: IfcOpenshellInstance;
    unit_scale?: number;
  }

  export interface IfcOpenshellGeometryClipSolidBoundedOptions {
    item: IfcOpenshellInstance;
    location: [number, number, number];
    normal: [number, number, number];
    boundary_points: [number, number][];
    boundary_position: [number, number, number];
    element?: IfcOpenshellInstance;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellGeometryClipSolidOptions {
    item: IfcOpenshellInstance;
    location: [number, number, number];
    normal: [number, number, number];
    element?: IfcOpenshellInstance;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellGeometryComputeWallMountedHandrailOptions {
    railing_path: [number, number, number][];
    support_spacing: number;
    railing_diameter: number;
    clear_width: number;
    height: number;
    use_manual_supports?: boolean;
    terminal_type?: GeometryRailingTerminalType;
    looped_path?: boolean;
    unit_scale?: number;
  }

  export interface IfcOpenshellGeometryConnectElementOptions {
    relating_element: IfcOpenshellInstance;
    related_element: IfcOpenshellInstance;
    description?: string;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellGeometryConnectPathOptions {
    relating_element: IfcOpenshellInstance;
    related_element: IfcOpenshellInstance;
    relating_connection: GeometryPathConnectionType;
    related_connection: GeometryPathConnectionType;
    description?: string;
    connection_geometry?: IfcOpenshellInstance;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellGeometryConnectWallOptions {
    first_wall: IfcOpenshellInstance;
    second_wall: IfcOpenshellInstance;
    is_atpath?: boolean;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellGeometryCopyRepresentationOptions {
    source: IfcOpenshellInstance;
    target: IfcOpenshellInstance;
    context_identifier?: string;
  }

  export interface IfcOpenshellGeometryCreate2PtWallOptions {
    element: IfcOpenshellInstance;
    context: IfcOpenshellInstance;
    start: [number, number];
    end: [number, number];
    elevation: number;
    height: number;
    thickness: number;
    is_si?: boolean;
  }

  export interface IfcOpenshellGeometryDisconnectPathOptions {
    element?: IfcOpenshellInstance;
    connection_type?: GeometryPathConnectionType;
    relating_element?: IfcOpenshellInstance;
    related_element?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellGeometryDoorLiningProperties {
    lining_depth?: number;
    lining_thickness?: number;
    lining_offset?: number;
    lining_to_panel_offset_x?: number;
    lining_to_panel_offset_y?: number;
    transom_thickness?: number;
    transom_offset?: number;
    casing_depth?: number;
    casing_thickness?: number;
    threshold_depth?: number;
    threshold_thickness?: number;
    threshold_offset?: number;
  }

  export interface IfcOpenshellGeometryDoorPanelProperties {
    panel_depth?: number;
    panel_width?: number;
    frame_depth?: number;
    frame_thickness?: number;
  }

  export interface IfcOpenshellGeometryEditObjectPlacementOptions {
    product: IfcOpenshellInstance;
    matrix?: [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
    is_si?: boolean;
    should_transform_children?: boolean;
  }

  export interface IfcOpenshellGeometryEntityClipping {
    entity: IfcOpenshellInstance;
  }

  export interface IfcOpenshellGeometryMeshFace {
    outer: number[];
    inner_loops?: number[][];
  }

  export interface IfcOpenshellGeometryMeshItem {
    vertices: [number, number, number][];
    faces: IfcOpenshellGeometryMeshFace[];
  }

  export interface IfcOpenshellGeometryPlaneClipping {
    location: [number, number, number];
    normal: [number, number, number];
  }

  export interface IfcOpenshellGeometryRegenerateWallRepresentationOptions {
    wall: IfcOpenshellInstance;
    length: number;
    height: number;
    angle?: number;
  }

  export interface IfcOpenshellGeometryRemoveRepresentationOptions {
    should_keep_named_profiles?: boolean;
  }

  export interface IfcOpenshellGeometryValidateTypeOptions {
    preferred_item?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellGeometryWindowLiningProperties {
    lining_depth?: number;
    lining_thickness?: number;
    lining_offset?: number;
    lining_to_panel_offset_x?: number;
    lining_to_panel_offset_y?: number;
    mullion_thickness?: number;
    first_mullion_offset?: number;
    second_mullion_offset?: number;
    transom_thickness?: number;
    first_transom_offset?: number;
    second_transom_offset?: number;
  }

  export interface IfcOpenshellGeometryWindowPanelProperties {
    frame_depth?: number;
    frame_thickness?: number;
  }

  export interface IfcOpenshellGeoreferenceAddGeoreferencingOptions {
    ifc_class: string;
    name: string;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellGeoreferenceEditGeoreferencingOptions {
    coordinate_operation?: number;
    projected_crs?: number;
  }

  export interface IfcOpenshellGeoreferenceEditTrueNorthOptions {
    true_north?: [number, number];
  }

  export interface IfcOpenshellGeoreferenceEditWcsOptions {
    x?: number;
    y?: number;
    z?: number;
    rotation?: number;
    is_si?: boolean;
  }

  export interface IfcOpenshellGroupAddGroupOptions {
    name: string;
    description?: string;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellGroupAssignGroupOptions {
    products: IfcOpenshellParseInstanceList;
    group: IfcOpenshellInstance;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellGroupUnassignGroupOptions {
    products: IfcOpenshellParseInstanceList;
    group: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellGroupUpdateGroupProductsOptions {
    group: IfcOpenshellInstance;
    products: IfcOpenshellParseInstanceList;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellLayerAddLayerWithStyleOptions {
    on?: boolean;
    frozen?: boolean;
    blocked?: boolean;
    styles: IfcOpenshellParseInstanceList;
  }

  export interface IfcOpenshellLibraryAssignReferenceOptions {
    products: IfcOpenshellParseInstanceList;
    reference: IfcOpenshellInstance;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellLibraryUnassignReferenceOptions {
    reference: IfcOpenshellInstance;
    products: IfcOpenshellParseInstanceList;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellMaterialAddConstituentOptions {
    material: IfcOpenshellInstance;
    name?: string;
  }

  export interface IfcOpenshellMaterialAddLayerOptions {
    material: IfcOpenshellInstance;
    name?: string;
  }

  export interface IfcOpenshellMaterialAddMaterialOptions {
    name?: string;
    category?: string;
    description?: string;
  }

  export interface IfcOpenshellMaterialAddMaterialSetOptions {
    name?: string;
    set_type?: string;
  }

  export interface IfcOpenshellMaterialAddProfileOptions {
    material?: IfcOpenshellInstance;
    profile?: IfcOpenshellInstance;
    name?: string;
  }

  export interface IfcOpenshellMaterialAssignMaterialOptions {
    type?: string;
    material?: IfcOpenshellInstance;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellMaterialConstituentEntryOptions {
    name: string;
    material: IfcOpenshellInstance;
  }

  export interface IfcOpenshellMaterialEditProfileUsageOptions {
    attributes: number;
    profile_width?: number;
    profile_height?: number;
  }

  export interface IfcOpenshellMaterialRemoveItemOptions {
    should_remove_material?: boolean;
  }

  export interface IfcOpenshellMaterialRemoveListItemOptions {
    material_index?: number;
  }

  export interface IfcOpenshellMaterialRemoveProfileOptions {
    should_remove_profile_def?: boolean;
    should_remove_material?: boolean;
  }

  export interface IfcOpenshellMaterialReorderSetItemOptions {
    old_index?: number;
    new_index?: number;
  }

  export interface IfcOpenshellMaterialSetShapeAspectConstituentsOptions {
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellMaterialUnassignMaterialOptions {
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellNestAssignObjectOptions {
    products: IfcOpenshellParseInstanceList;
    relating_object: IfcOpenshellInstance;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellNestChangeNestOptions {
    item: IfcOpenshellInstance;
    new_parent: IfcOpenshellInstance;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellNestReorderNestingOptions {
    item: IfcOpenshellInstance;
    old_index?: number;
    new_index?: number;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellNestUnassignObjectOptions {
    products: IfcOpenshellParseInstanceList;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellOwnerAddActorOptions {
    actor: IfcOpenshellInstance;
    ifc_class: string;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellOwnerAddApplicationOptions {
    application_developer?: IfcOpenshellInstance;
    version: string;
    application_full_name: string;
    application_identifier: string;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellOwnerAssignActorOptions {
    relating_actor: IfcOpenshellInstance;
    related_object: IfcOpenshellInstance;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellOwnerCreateOwnerHistoryOptions {
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellOwnerUnassignActorOptions {
    relating_actor: IfcOpenshellInstance;
    related_object: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellOwnerUpdateOwnerHistoryOptions {
    element?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellProfileAddArbitraryProfileOptions {
    profile: [number, number][] | [number, number, number][];
    name?: string;
  }

  export interface IfcOpenshellProfileAddArbitraryProfileWithVoidsOptions {
    outer_profile: [number, number][] | [number, number, number][];
    inner_profiles: ([number, number][] | [number, number, number][])[];
    name?: string;
  }

  export interface IfcOpenshellProjectAppendAssetOptions {
    library: IfcOpenshellFile;
    element: IfcOpenshellInstance;
    cache?: IfcOpenshellProjectAppendAssetCache;
    assume_asset_uniqueness_by_name?: boolean;
  }

  export interface IfcOpenshellProjectAssignDeclarationOptions {
    definitions: IfcOpenshellParseInstanceList;
    relating_context: IfcOpenshellInstance;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellProjectUnassignDeclarationOptions {
    definitions: IfcOpenshellParseInstanceList;
    relating_context: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellPsetAddPsetOptions {
    product: IfcOpenshellInstance;
    name: string;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
    ifc2x3_subclass?: string;
  }

  export interface IfcOpenshellPsetAddQtoOptions {
    product: IfcOpenshellInstance;
    name: string;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellPsetAssignPsetOptions {
    products: IfcOpenshellParseInstanceList;
    pset: IfcOpenshellInstance;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellPsetEditPsetOptions {
    pset: IfcOpenshellInstance;
    name?: string;
    properties: number;
    pset_template?: IfcOpenshellInstance;
    should_purge?: boolean;
  }

  export interface IfcOpenshellPsetEditQtoOptions {
    qto: IfcOpenshellInstance;
    name?: string;
    properties: number;
    qto_template?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellPsetTemplateEditPropTemplateOptions {
    prop_template: IfcOpenshellInstance;
    attributes: number;
  }

  export interface IfcOpenshellPsetUnsharePsetOptions {
    products: IfcOpenshellParseInstanceList;
    pset: IfcOpenshellInstance;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellRepresentationGetProductRepresentationOptions {
    context?: IfcOpenshellInstance;
    context_type?: string;
    subcontext?: string;
    target_view?: string;
  }

  export interface IfcOpenshellResourceAddResourceOptions {
    parent_resource?: IfcOpenshellInstance;
    ifc_class?: string;
    name?: string;
    predefined_type?: string;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellResourceAssignmentOptions {
    relating_resource: IfcOpenshellInstance;
    related_object: IfcOpenshellInstance;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellResourceRemoveResourceOptions {
    resource: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellRootCreateEntityOptions {
    ifc_class: string;
    predefined_type?: string;
    name?: string;
    owner_history?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellRootReassignClassOptions {
    product: IfcOpenshellInstance;
    ifc_class?: string;
    predefined_type?: string;
    occurrence_class?: string;
  }

  export interface IfcOpenshellRootRemoveProductOptions {
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellSequenceAddTaskOptions {
    work_schedule?: IfcOpenshellInstance;
    parent_task?: IfcOpenshellInstance;
    name?: string;
    description?: string;
    identification?: string;
    predefined_type?: string;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellSequenceAddTaskTimeOptions {
    is_recurring?: boolean;
  }

  export interface IfcOpenshellSequenceAddTimePeriodOptions {
    start_time?: string;
    end_time?: string;
  }

  export interface IfcOpenshellSequenceAddWorkCalendarOptions {
    name?: string;
    predefined_type?: string;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellSequenceAddWorkPlanOptions {
    name?: string;
    predefined_type?: string;
    creation_date?: string;
    start_time?: string;
    creator_person?: IfcOpenshellInstance;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellSequenceAddWorkScheduleOptions {
    name?: string;
    predefined_type?: string;
    object_type?: string;
    creation_date?: string;
    start_time?: string;
    work_plan?: IfcOpenshellInstance;
    creator_person?: IfcOpenshellInstance;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellSequenceAssignLagTimeOptions {
    duration_type?: string;
  }

  export interface IfcOpenshellSequenceAssignProcessOptions {
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellSequenceAssignProductOptions {
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellSequenceAssignSequenceOptions {
    sequence_type?: string;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellSequenceAssignWorkPlanOptions {
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellSequenceCopyWorkScheduleOptions {
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellSequenceCreateBaselineOptions {
    name?: string;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellSequenceDuplicateTaskOptions {
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellSequenceRemoveOptions {
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellShapeBuilderArcSegment {
    arc_indices: [number, number, number];
  }

  export interface IfcOpenshellShapeBuilderAxis2Placement2dOptions {
    position?: [number, number];
    x_direction?: [number, number];
  }

  export interface IfcOpenshellShapeBuilderAxis2Placement3dOptions {
    position?: [number, number, number];
    z_axis?: [number, number, number];
    x_axis?: [number, number, number];
  }

  export interface IfcOpenshellShapeBuilderBlockOptions {
    position?: [number, number, number];
    x_length?: number;
    y_length?: number;
    z_length?: number;
  }

  export interface IfcOpenshellShapeBuilderEllipseCardinalTrim {
    cardinal_points: [number, number];
  }

  export interface IfcOpenshellShapeBuilderEllipseCurveOptions {
    x_axis_radius: number;
    y_axis_radius: number;
    position?: [number, number];
    ref_x_direction?: [number, number];
    trim?: IfcOpenshellShapeBuilderEllipseTrim;
  }

  export interface IfcOpenshellShapeBuilderEllipsePointTrim {
    points: [[number, number], [number, number]];
  }

  export interface IfcOpenshellShapeBuilderEllipseTrim {
    value: IfcOpenshellShapeBuilderEllipsePointTrim | IfcOpenshellShapeBuilderEllipseCardinalTrim;
  }

  export interface IfcOpenshellShapeBuilderExtrudeOptions {
    profile_or_curve: IfcOpenshellInstance;
    magnitude?: number;
    position?: [number, number, number];
    extrusion_vector?: [number, number, number];
    position_z_axis?: [number, number, number];
    position_x_axis?: [number, number, number];
    position_y_axis?: [number, number, number];
  }

  export interface IfcOpenshellShapeBuilderHalfSpaceSolidOptions {
    plane: IfcOpenshellInstance;
    agreement_flag?: boolean;
  }

  export interface IfcOpenshellShapeBuilderIndexedPolycurve2dOptions {
    points: [number, number][];
    segments: (IfcOpenshellShapeBuilderLineSegment | IfcOpenshellShapeBuilderArcSegment)[];
  }

  export interface IfcOpenshellShapeBuilderLineSegment {
    line_indices: number[];
  }

  export interface IfcOpenshellShapeBuilderMepBendDirection {
    x: number;
    y: number;
  }

  export interface IfcOpenshellShapeBuilderMepBendShapeOptions {
    segment: IfcOpenshellInstance;
    start_length: number;
    end_length: number;
    angle: number;
    radius: number;
    bend_vector: IfcOpenshellShapeBuilderMepBendDirection;
    flip_z_axis: boolean;
  }

  export interface IfcOpenshellShapeBuilderMepOffset {
    x: number;
    y: number;
  }

  export interface IfcOpenshellShapeBuilderMepProfileHalfDimensions {
    half_x: number;
    half_y: number;
    depth: number;
  }

  export interface IfcOpenshellShapeBuilderMepTransitionCalculateOptions {
    start_half_dim: IfcOpenshellShapeBuilderMepProfileHalfDimensions;
    end_half_dim: IfcOpenshellShapeBuilderMepProfileHalfDimensions;
    offset: IfcOpenshellShapeBuilderMepOffset;
    diff?: IfcOpenshellShapeBuilderMepOffset;
    end_profile?: boolean;
    calculation: IfcOpenshellShapeBuilderMepTransitionFromLength | IfcOpenshellShapeBuilderMepTransitionFromAngle;
  }

  export interface IfcOpenshellShapeBuilderMepTransitionFromAngle {
    angle: number;
  }

  export interface IfcOpenshellShapeBuilderMepTransitionFromLength {
    length: number;
  }

  export interface IfcOpenshellShapeBuilderMepTransitionLengthOptions {
    start_half_dim: IfcOpenshellShapeBuilderMepProfileHalfDimensions;
    end_half_dim: IfcOpenshellShapeBuilderMepProfileHalfDimensions;
    angle: number;
    profile_offset?: IfcOpenshellShapeBuilderMepOffset;
  }

  export interface IfcOpenshellShapeBuilderMepTransitionShapeOptions {
    start_segment: IfcOpenshellInstance;
    end_segment: IfcOpenshellInstance;
    start_length: number;
    end_length: number;
    angle?: number;
    profile_offset?: IfcOpenshellShapeBuilderMepOffset;
  }

  export interface IfcOpenshellShapeBuilderMirrorOptions {
    item: IfcOpenshellInstance;
    mirror_axes?: [number, number];
    mirror_point?: [number, number];
    create_copy?: boolean;
    placement_matrix?: [number, number, number, number, number, number, number, number, number] | [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
  }

  export interface IfcOpenshellShapeBuilderPolylineOptions {
    points: [number, number][] | [number, number, number][];
    position_offset?: [number, number] | [number, number, number];
    segments?: (IfcOpenshellShapeBuilderLineSegment | IfcOpenshellShapeBuilderArcSegment)[];
  }

  export interface IfcOpenshellShapeBuilderProfileOptions {
    outer_curve: IfcOpenshellInstance;
    name?: string;
    inner_curves?: IfcOpenshellParseInstanceList;
    profile_type?: string;
  }

  export interface IfcOpenshellShapeBuilderRepresentationOptions {
    context: IfcOpenshellInstance;
    items: IfcOpenshellParseInstanceList;
    representation_type?: string;
  }

  export interface IfcOpenshellShapeBuilderRotateOptions {
    item: IfcOpenshellInstance;
    angle?: number;
    pivot_point?: [number, number];
    counter_clockwise?: boolean;
    create_copy?: boolean;
  }

  export interface IfcOpenshellShapeBuilderSphereOptions {
    radius?: number;
    center?: [number, number, number];
  }

  export interface IfcOpenshellShapeBuilderTranslateOptions {
    item: IfcOpenshellInstance;
    translation: [number, number] | [number, number, number];
    create_copy?: boolean;
  }

  export interface IfcOpenshellSpatialAssignContainerOptions {
    products: IfcOpenshellParseInstanceList;
    relating_structure: IfcOpenshellInstance;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellSpatialDereferenceStructureOptions {
    products: IfcOpenshellParseInstanceList;
    relating_structure: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellSpatialReferenceStructureOptions {
    products: IfcOpenshellParseInstanceList;
    relating_structure: IfcOpenshellInstance;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellSpatialUnassignContainerOptions {
    products: IfcOpenshellParseInstanceList;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellStructuralAddStructuralActivityOptions {
    activity_owner_history?: IfcOpenshellInstance;
    relationship_owner_history?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellStructuralAddStructuralBoundaryConditionOptions {
    name?: string;
    connection?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellStructuralAssignStructuralAnalysisModelOptions {
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellStructuralRemoveStructuralBoundaryConditionOptions {
    connection?: IfcOpenshellInstance;
    boundary_condition?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellStructuralUnassignStructuralAnalysisModelOptions {
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellStyleAssignItemStyleOptions {
    item: IfcOpenshellInstance;
    style?: IfcOpenshellInstance;
    should_use_presentation_style_assignment?: boolean;
  }

  export interface IfcOpenshellStyleSurfaceTextureOptions {
    repeat_s: boolean;
    repeat_t: boolean;
    mode?: string;
    url_reference: string;
    texture_transform?: IfcOpenshellInstance;
    parameter?: string[];
    uv_mode?: StyleUvMode;
  }

  export interface IfcOpenshellSystemAddPortOptions {
    element?: IfcOpenshellInstance;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellSystemAddSystemOptions {
    ifc_class: string;
    owner_history?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellSystemAssignFlowControlOptions {
    relating_flow_element: IfcOpenshellInstance;
    related_flow_control: IfcOpenshellInstance;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellSystemAssignPortOptions {
    element: IfcOpenshellInstance;
    port: IfcOpenshellInstance;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellSystemAssignSystemOptions {
    products: IfcOpenshellParseInstanceList;
    system: IfcOpenshellInstance;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellSystemConnectPortOptions {
    port1: IfcOpenshellInstance;
    port2: IfcOpenshellInstance;
    direction: SystemFlowDirection;
    element?: IfcOpenshellInstance;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellSystemUnassignFlowControlOptions {
    relating_flow_element: IfcOpenshellInstance;
    related_flow_control: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellSystemUnassignPortOptions {
    element: IfcOpenshellInstance;
    port: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellSystemUnassignSystemOptions {
    products: IfcOpenshellParseInstanceList;
    system: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellTypeAssignTypeOptions {
    objects: IfcOpenshellParseInstanceList;
    relating_type: IfcOpenshellInstance;
    should_map_representations?: boolean;
    owner_history?: IfcOpenshellInstance;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellTypeUnassignTypeOptions {
    objects: IfcOpenshellParseInstanceList;
    user?: IfcOpenshellInstance;
    application?: IfcOpenshellInstance;
  }

  export interface IfcOpenshellUnitAddConversionBasedUnitOptions {
    name?: string;
    conversion_offset?: number;
  }

  export interface IfcOpenshellUnitAddDerivedUnitOptions {
    unit_type: string;
    userdefinedtype?: string;
    elements: IfcOpenshellUnitDerivedUnitElement[];
  }

  export interface IfcOpenshellUnitAssignUnitOptions {
    units?: IfcOpenshellParseInstanceList;
    length_is_metric?: boolean;
    length_raw?: string;
    area_is_metric?: boolean;
    area_raw?: string;
    volume_is_metric?: boolean;
    volume_raw?: string;
  }

  export interface IfcOpenshellUnitDerivedUnitElement {
    unit: IfcOpenshellInstance;
    exponent: bigint;
  }

  export interface IfcOpenshellUnitEditNamedUnitOptions {
    unit: IfcOpenshellInstance;
    attributes: number;
  }

  export class IfcOpenshellAggregationType {
    readonly ptr: number;
    destroy(): void;
    asAggregationType(): IfcOpenshellAggregationType | null;
    bound1(): number;
    bound2(): number;
    kind(): string;
    typeOfAggregation(): number;
    typeOfAggregationString(): string;
    typeOfElement(): IfcOpenshellParameterType | null;
  }

  export class IfcOpenshellAttribute {
    readonly ptr: number;
    destroy(): void;
    name(): string;
    optional(): boolean;
    typeOfAttribute(): IfcOpenshellParameterType | null;
  }

  export class IfcOpenshellParseAttributeValue {
    readonly ptr: number;
    destroy(): void;
    asBool(): boolean;
    asDouble(): number;
    asDoubleList(): number[];
    asDoubleListList(): number[][];
    asEnumerationIndex(): number;
    asEnumerationType(): IfcOpenshellEnumeration | null;
    asEnumerationValue(): string;
    asInstance(): IfcOpenshellInstance | null;
    asInstanceIdListList(): number[][];
    asInstanceList(): IfcOpenshellParseInstanceList;
    asInt32(): number;
    asInt32List(): number[];
    asInt32ListList(): number[][];
    asLogical(): number;
    asString(): string;
    asStringList(): string[];
    isNull(): boolean;
    size(): number;
    type(): string;
  }

  export class IfcOpenshellGeomBrepElement {
    readonly ptr: number;
    destroy(): void;
    calcSurfaceArea(): number;
    calcVolume(): number;
    calculateProjectedSurfaceArea(along_x: number, along_y: number, along_z: number): boolean;
    geometry(): IfcOpenshellGeomBrepRepresentation;
  }

  export class IfcOpenshellGeomBrepRepresentation {
    readonly ptr: number;
    destroy(): void;
    asCompound(force_meters: boolean): IfcOpenshellGeomConversionResultShape | null;
    calculateProjectedSurfaceArea(ax: IfcOpenshellGeomTaxonomyMatrix4, along_x: number, along_y: number, along_z: number): boolean;
    calculateSurfaceArea(): number;
    calculateVolume(): number;
    entity(): string;
    id(): string;
    item(i: number): IfcOpenshellGeomConversionResultShape | null;
    itemId(i: number): number;
    settings(): IfcOpenshellGeomSettings;
    size(): number;
  }

  export class IfcOpenshellGeomBuffer {
    readonly ptr: number;
    destroy(): void;
    getValue(): string;
    isReady(): boolean;
  }

  export class IfcOpenshellGeomConversionResultShape {
    readonly ptr: number;
    destroy(): void;
    add(arg_0: IfcOpenshellGeomConversionResultShape): IfcOpenshellGeomConversionResultShape | null;
    area(): number;
    box(): IfcOpenshellGeomConversionResultShape | null;
    concat(arg_0: IfcOpenshellGeomConversionResultShape): IfcOpenshellGeomConversionResultShape | null;
    convexTag(value: boolean): void;
    edges(): IfcOpenshellGeomConversionResultShape[];
    facets(): IfcOpenshellGeomConversionResultShape[];
    halfspaces(): IfcOpenshellGeomConversionResultShape | null;
    intersect(arg_0: IfcOpenshellGeomConversionResultShape): IfcOpenshellGeomConversionResultShape | null;
    isManifold(): boolean;
    length(): number;
    moved(arg_0: IfcOpenshellGeomTaxonomyMatrix4): IfcOpenshellGeomConversionResultShape | null;
    numEdges(): number;
    numFaces(): number;
    numVertices(): number;
    serialize(): string;
    serializeObj(): string;
    solid(): IfcOpenshellGeomConversionResultShape | null;
    solidMt(): IfcOpenshellGeomConversionResultShape | null;
    subtract(arg_0: IfcOpenshellGeomConversionResultShape): IfcOpenshellGeomConversionResultShape | null;
    surfaceAreaAlongDirection(tol: number, arg_1: IfcOpenshellGeomTaxonomyMatrix4, along_x: number, along_y: number, along_z: number): boolean;
    surfaceGenus(): number;
    vertices(): IfcOpenshellGeomConversionResultShape[];
    volume(): number;
    wrapInCompound(): IfcOpenshellGeomConversionResultShape | null;
  }

  export class IfcOpenshellDeclaration {
    readonly ptr: number;
    destroy(): void;
    asEntity(): IfcOpenshellEntity | null;
    asEnumerationType(): IfcOpenshellEnumeration | null;
    asSelectType(): IfcOpenshellSelectType | null;
    asTypeDeclaration(): IfcOpenshellTypeDeclaration | null;
    indexInSchema(): number;
    isA(name: string): boolean;
    name(): string;
    nameUc(): string;
    schema(): IfcOpenshellSchema | null;
    type(): number;
  }

  export class IfcOpenshellGeomElement {
    readonly ptr: number;
    destroy(): void;
    context(): string;
    guid(): string;
    id(): number;
    name(): string;
    parentId(): number;
    parents(): IfcOpenshellGeomElement[];
    product(): IfcOpenshellInstance;
    transformation(): IfcOpenshellGeomTransformation;
    transformationBuffer(): Float64Array;
    transformationBuffer<T extends IfcOpenshellNumericTypedArray>(arrayType: IfcOpenshellNumericArrayConstructor<T>): T;
    transformationBufferSize(): number;
    type(): string;
    uniqueId(): string;
  }

  export class IfcOpenshellEntity {
    readonly ptr: number;
    destroy(): void;
    allAttributes(): IfcOpenshellAttribute[];
    allInverseAttributes(): IfcOpenshellInverseAttribute[];
    argumentTypes(): string[];
    asEntity(): IfcOpenshellEntity | null;
    attributeByIndex(index: number): IfcOpenshellAttribute | null;
    attributeCount(): number;
    attributeIndex(attr_name: string): number;
    attributes(): IfcOpenshellAttribute[];
    derived(): boolean[];
    inverseAttributes(): IfcOpenshellInverseAttribute[];
    isAbstract(): boolean;
    setAttributes(attributes: IfcOpenshellAttribute[], derived: boolean[]): void;
    setInverseAttributes(inverse_attributes: IfcOpenshellInverseAttribute[]): void;
    setSubtypes(subtypes: IfcOpenshellEntity[]): void;
    subtypes(): IfcOpenshellEntity[];
    supertype(): IfcOpenshellEntity | null;
  }

  export class IfcOpenshellEnumeration {
    readonly ptr: number;
    destroy(): void;
    argumentTypes(): string[];
    asEnumerationType(): IfcOpenshellEnumeration | null;
    enumerationItems(): string[];
    lookupEnumOffset(value_name: string): number;
    lookupEnumValue(i: number): string;
  }

  export class IfcOpenshellFile {
    readonly ptr: number;
    destroy(): void;
    add(entity: IfcOpenshellInstance, instance_id: number): IfcOpenshellInstance;
    addEntity(instance: IfcOpenshellInstance, id: number): IfcOpenshellInstance;
    addTypeRef(new_entity: IfcOpenshellInstance): void;
    batch(): void;
    buildInverses(): void;
    buildInverses(entity: IfcOpenshellInstance): void;
    byGuid(global_id: string): IfcOpenshellInstance;
    byId(instance_id: number): IfcOpenshellInstance;
    byType(type_name: string): IfcOpenshellParseInstanceList;
    byTypeExclSubtypes(type_name: string): IfcOpenshellParseInstanceList;
    bypassType(type_name: string): void;
    create(declaration: IfcOpenshellDeclaration, instance_id: number): IfcOpenshellInstance;
    createEntityByName(type_name: string): IfcOpenshellInstance;
    createEntityByNameWithId(type_name: string, id: number): IfcOpenshellInstance;
    createTimestamp(): string;
    entityNames(): number[];
    filePointer(): number;
    freshId(): number;
    getInverse(instance: IfcOpenshellInstance): IfcOpenshellParseInstanceList;
    getInverseIndices(instance: IfcOpenshellInstance): number[];
    getInverseIndicesById(instance_id: number): number[];
    getInversesByDeclaration(instance_id: number, declaration: IfcOpenshellDeclaration, attribute_index: number): IfcOpenshellInstance[];
    getMaxId(): number;
    getTotalInverses(instance: IfcOpenshellInstance): number;
    getTotalInversesById(instance_id: number): number;
    getUnit(unit_type: string): number;
    good(): number;
    header(): IfcOpenshellHeader | null;
    headerFileDescription(): IfcOpenshellInstance | null;
    headerFileName(): IfcOpenshellInstance | null;
    headerFileSchema(): IfcOpenshellInstance | null;
    ifcrootType(): IfcOpenshellDeclaration | null;
    initialize(path: string, type: filetype, read_only: boolean): boolean;
    instancesByReference(reference_id: number): IfcOpenshellParseInstanceList;
    keyValueStoreIter(prefix: string): string[];
    keyValueStoreQuery(key: string): number[];
    processDeletionInverse(entity: IfcOpenshellInstance): void;
    recalculateIdCounter(): void;
    remove(entity: IfcOpenshellInstance): void;
    removeTypeRef(new_entity: IfcOpenshellInstance): void;
    resetIdentityCache(): void;
    schema(): IfcOpenshellSchema | null;
    schemaName(): string;
    storageMode(): number;
    toString(): string;
    traverse(instance: IfcOpenshellInstance, max_depth: number): IfcOpenshellParseInstanceList;
    traverseBreadthFirst(instance: IfcOpenshellInstance, max_depth: number): IfcOpenshellParseInstanceList;
    types(): string[];
    unbatch(): void;
    write(path: string): void;
  }

  export class IfcOpenshellFileDescription {
    readonly ptr: number;
    destroy(): void;
    class(): IfcOpenshellEntity;
    description(): string[];
    implementationLevel(): string;
    initialize(v1_description: string[], v2_implementation_level: string): IfcOpenshellFileDescription;
    setdescription(v: string[]): void;
    setimplementationLevel(v: string): void;
  }

  export class IfcOpenshellFileName {
    readonly ptr: number;
    destroy(): void;
    author(): string[];
    authorization(): string;
    class(): IfcOpenshellEntity;
    initialize(v1_name: string, v2_time_stamp: string, v3_author: string[], v4_organization: string[], v5_preprocessor_version: string, v6_originating_system: string, v7_authorization: string): IfcOpenshellFileName;
    name(): string;
    organization(): string[];
    originatingSystem(): string;
    preprocessorVersion(): string;
    setauthor(v: string[]): void;
    setauthorization(v: string): void;
    setname(v: string): void;
    setorganization(v: string[]): void;
    setoriginatingSystem(v: string): void;
    setpreprocessorVersion(v: string): void;
    settimeStamp(v: string): void;
    timeStamp(): string;
  }

  export class IfcOpenshellFileSchema {
    readonly ptr: number;
    destroy(): void;
    class(): IfcOpenshellEntity;
    initialize(v1_schema_identifiers: string[]): IfcOpenshellFileSchema;
    schemaIdentifiers(): string[];
    setschemaIdentifiers(v: string[]): void;
  }

  export class IfcOpenshellGeomFunctionItemEvaluator {
    readonly ptr: number;
    destroy(): void;
    evaluate(): IfcOpenshellGeomTaxonomyItem;
    evaluateAt(u: number): number[];
    evaluateRange(ustart: number, uend: number, nsteps: number): IfcOpenshellGeomTaxonomyItem;
    evaluationPoints(): number[];
    evaluationPointsRange(ustart: number, uend: number, nsteps: number): number[];
  }

  export class IfcOpenshellGeomGeometrySerializer {
    readonly ptr: number;
    destroy(): void;
    finalize(): void;
    geometrySettings(): IfcOpenshellGeomSettings;
    isStreaming(): boolean;
    isTesselated(): boolean;
    read(f: IfcOpenshellFile, guid: string, representation_id: string, rt: read_type): IfcOpenshellGeomElement | null;
    ready(): boolean;
    setFile(arg_0: IfcOpenshellFile): void;
    setUnitNameAndMagnitude(name: string, magnitude: number): void;
    settings(): IfcOpenshellGeomSerializerSettings;
    writeBrepElement(o: IfcOpenshellGeomBrepElement): void;
    writeHeader(): void;
    writeTriangulationElement(o: IfcOpenshellGeomTriangulationElement): void;
  }

  export class IfcOpenshellHeader {
    readonly ptr: number;
    destroy(): void;
    file(): IfcOpenshellFile | null;
    fileDescription(): IfcOpenshellFileDescription;
    fileName(): IfcOpenshellFileName;
    fileSchema(): IfcOpenshellFileSchema;
    write(): string;
  }

  export class IfcOpenshellInstance {
    readonly ptr: number;
    destroy(): void;
    className(with_schema: boolean): string;
    declaration(): IfcOpenshellDeclaration;
    file(): IfcOpenshellFile | null;
    filePointer(): number;
    getArgument(attribute_index: number): IfcOpenshellParseAttributeValue;
    getArgumentByName(name: string): IfcOpenshellParseAttributeValue;
    getArgumentIndex(name: string): number;
    getArgumentName(index: number): string;
    getArgumentType(index: number): string;
    getAttributeCategory(name: string): number;
    getAttributeNames(): string[];
    getAttributeValue(index: number): IfcOpenshellParseAttributeValue;
    getInverse(name: string): IfcOpenshellParseInstanceList;
    getInverseAttributeByName(name: string): IfcOpenshellParseInstanceList;
    getInverseAttributeNames(): string[];
    id(): number;
    identity(): number;
    isA(declaration_name: string): boolean;
    setArgumentAsAggregateOfAggregateOfEntityInstance(index: number, value: number[][]): void;
    setArgumentBool(index: number, value: boolean): void;
    setArgumentDouble(index: number, value: number): void;
    setArgumentDoubleList(index: number, value: number[]): void;
    setArgumentDoubleListList(index: number, value: number[][]): void;
    setArgumentEnumeration(index: number, enumeration: IfcOpenshellEnumeration, enumeration_index: number): void;
    setArgumentEnumerationByName(index: number, value: string): boolean;
    setArgumentInstance(index: number, value: IfcOpenshellInstance): void;
    setArgumentInstanceList(index: number, value: IfcOpenshellParseInstanceList): void;
    setArgumentInt32(index: number, value: number): void;
    setArgumentInt32List(index: number, value: number[]): void;
    setArgumentInt32ListList(index: number, value: number[][]): void;
    setArgumentLogical(index: number, value: number): void;
    setArgumentString(index: number, value: string): void;
    setArgumentStringList(index: number, value: string[]): void;
    setAttributeValue(name: string, value: IfcOpenshellParseAttributeValue): void;
    toString(valid_spf: boolean): string;
    unsetArgument(index: number): void;
    unsetAttributeValue(name: string): void;
  }

  export class IfcOpenshellParseInstanceList {
    readonly ptr: number;
    destroy(): void;
    get(index: number): IfcOpenshellInstance | null;
    size(): number;
  }

  export class IfcOpenshellInstanceStreamer {
    readonly ptr: number;
    destroy(): void;
    bypassedInstances(): number[];
    hasSemicolon(): boolean;
    inverses(): string;
    pushPage(page_data: string): void;
    readInstancePy(type_as_declaration_instance: boolean): string;
    references(): string;
    semicolonCount(): number;
    status(): number;
  }

  export class IfcOpenshellInverseAttribute {
    readonly ptr: number;
    destroy(): void;
    attributeReference(): IfcOpenshellAttribute | null;
    bound1(): number;
    bound2(): number;
    entityReference(): IfcOpenshellEntity | null;
    name(): string;
    typeOfAggregation(): number;
    typeOfAggregationString(): string;
  }

  export class IfcOpenshellGeomIterator {
    readonly ptr: number;
    destroy(): void;
    boundsMax(): IfcOpenshellGeomTaxonomyPoint3;
    boundsMin(): IfcOpenshellGeomTaxonomyPoint3;
    computeBounds(with_geometry: boolean): void;
    create(): IfcOpenshellInstance;
    file(): IfcOpenshellFile | null;
    get(): IfcOpenshellGeomElement | null;
    getAsBrepElement(): IfcOpenshellGeomBrepElement | null;
    getAsSerializedElement(): IfcOpenshellGeomSerializedElement | null;
    getAsTriangulationElement(): IfcOpenshellGeomTriangulationElement | null;
    getLog(): string;
    getNative(): IfcOpenshellGeomBrepElement | null;
    getObject(id: number): IfcOpenshellGeomElement | null;
    getTaskItems(): IfcOpenshellGeomTaxonomyItem[];
    getTaskProducts(): IfcOpenshellInstance[][];
    hadErrorProcessingElements(): boolean;
    initialize(): boolean;
    next(): boolean;
    progress(): number;
    unitMagnitude(): number;
    unitName(): string;
  }

  export class IfcOpenshellNamedType {
    readonly ptr: number;
    destroy(): void;
    asNamedType(): IfcOpenshellNamedType | null;
    declaredType(): IfcOpenshellDeclaration | null;
    isA(name: string): boolean;
  }

  export class IfcOpenshellGeomOpaqueNumber {
    readonly ptr: number;
    destroy(): void;
    add(other: IfcOpenshellGeomOpaqueNumber): IfcOpenshellGeomOpaqueNumber | null;
    clone(): IfcOpenshellGeomOpaqueNumber | null;
    divide(other: IfcOpenshellGeomOpaqueNumber): IfcOpenshellGeomOpaqueNumber | null;
    equals(other: IfcOpenshellGeomOpaqueNumber): boolean;
    lessThan(other: IfcOpenshellGeomOpaqueNumber): boolean;
    multiply(other: IfcOpenshellGeomOpaqueNumber): IfcOpenshellGeomOpaqueNumber | null;
    negate(): IfcOpenshellGeomOpaqueNumber | null;
    subtract(other: IfcOpenshellGeomOpaqueNumber): IfcOpenshellGeomOpaqueNumber | null;
    toDouble(): number;
    toString(): string;
  }

  export class IfcOpenshellParameterType {
    readonly ptr: number;
    destroy(): void;
    asAggregationType(): IfcOpenshellAggregationType | null;
    asNamedType(): IfcOpenshellNamedType | null;
    asSimpleType(): IfcOpenshellSimpleType | null;
    kind(): string;
  }

  export class IfcOpenshellProjectAppendAssetCache {
    readonly ptr: number;
    destroy(): void;
  }

  export class IfcOpenshellPsetTemplateHandle {
    readonly ptr: number;
    destroy(): void;
  }

  export class IfcOpenshellSchema {
    readonly ptr: number;
    destroy(): void;
    declarationByIndex(declaration_index: number): IfcOpenshellDeclaration | null;
    declarationByName(name: string): IfcOpenshellDeclaration | null;
    declarations(): IfcOpenshellDeclaration[];
    entities(): IfcOpenshellEntity[];
    enumerationTypes(): IfcOpenshellEnumeration[];
    name(): string;
    selectTypes(): IfcOpenshellSelectType[];
    typeDeclarations(): IfcOpenshellTypeDeclaration[];
  }

  export class IfcOpenshellSelectType {
    readonly ptr: number;
    destroy(): void;
    asSelectType(): IfcOpenshellSelectType | null;
    selectList(): IfcOpenshellDeclaration[];
    selectListNames(): string[];
  }

  export class IfcOpenshellGeomSerialization {
    readonly ptr: number;
    destroy(): void;
    brepData(): string;
    surfaceStyleIds(): number[];
    surfaceStyles(): number[];
  }

  export class IfcOpenshellGeomSerializedElement {
    readonly ptr: number;
    destroy(): void;
    geometry(): IfcOpenshellGeomSerialization;
  }

  export class IfcOpenshellGeomSerializer {
    readonly ptr: number;
    destroy(): void;
    finalize(): void;
    isStreaming(): boolean;
    ready(): boolean;
    setFile(arg_0: IfcOpenshellFile): void;
    writeHeader(): void;
  }

  export class IfcOpenshellGeomSerializerSettings {
    readonly ptr: number;
    destroy(): void;
    getBool(name: string): boolean;
    getDouble(name: string): number;
    getInt(name: string): number;
    getIntSet(name: string): number[];
    getString(name: string): string;
    getType(name: string): string;
    setBool(name: string, value: boolean): void;
    setDouble(name: string, value: number): void;
    setInt(name: string, value: number): void;
    setIntSet(name: string, value: number[]): void;
    setString(name: string, value: string): void;
    settingNames(): string[];
  }

  export class IfcOpenshellGeomSettings {
    readonly ptr: number;
    destroy(): void;
    getBool(name: string): boolean;
    getDouble(name: string): number;
    getDoubleList(name: string): number[];
    getInt(name: string): number;
    getIntSet(name: string): number[];
    getString(name: string): string;
    getStringSet(name: string): string[];
    getType(name: string): string;
    setBool(name: string, value: boolean): void;
    setDouble(name: string, value: number): void;
    setDoubleList(name: string, value: number[]): void;
    setInt(name: string, value: number): void;
    setIntSet(name: string, value: number[]): void;
    setString(name: string, value: string): void;
    setStringSet(name: string, value: string[]): void;
    settingNames(): string[];
  }

  export class IfcOpenshellSimpleType {
    readonly ptr: number;
    destroy(): void;
    asSimpleType(): IfcOpenshellSimpleType | null;
    declaredType(): number;
    kind(): string;
  }

  export class IfcOpenshellGeomSvgfillPolygon {
    readonly ptr: number;
    destroy(): void;
    boundaryPoint(index: number): number[];
    boundarySize(): number;
    innerBoundaryCount(): number;
    innerBoundaryPoint(boundary_index: number, point_index: number): number[];
    innerBoundarySize(boundary_index: number): number;
    pointInside(): number[];
  }

  export class IfcOpenshellGeomTaxonomyBooleanResult {
    readonly ptr: number;
    destroy(): void;
    addItem(item: IfcOpenshellGeomTaxonomyItem): void;
    itemAt(index: number): IfcOpenshellGeomTaxonomyItem;
    itemCount(): number;
    operation(): operation_t;
  }

  export class IfcOpenshellGeomTaxonomyBsplineCurve {
    readonly ptr: number;
    destroy(): void;
    asItem(): IfcOpenshellGeomTaxonomyItem;
    controlPointAt(index: number): IfcOpenshellGeomTaxonomyPoint3;
    controlPointCount(): number;
    degree(): number;
    hasWeights(): boolean;
    knots(): number[];
    multiplicities(): number[];
    weights(): number[];
  }

  export class IfcOpenshellGeomTaxonomyBsplineSurface {
    readonly ptr: number;
    destroy(): void;
    asItem(): IfcOpenshellGeomTaxonomyItem;
    controlPointAt(row: number, col: number): IfcOpenshellGeomTaxonomyPoint3;
    controlPointColCountAt(row: number): number;
    controlPointRowCount(): number;
    degreeU(): number;
    degreeV(): number;
    hasWeights(): boolean;
    knotsU(): number[];
    knotsV(): number[];
    multiplicitiesU(): number[];
    multiplicitiesV(): number[];
    weightAt(row: number, col: number): number;
    weightColCountAt(row: number): number;
    weightRowCount(): number;
  }

  export class IfcOpenshellGeomTaxonomyCircle {
    readonly ptr: number;
    destroy(): void;
    matrix(): IfcOpenshellGeomTaxonomyMatrix4;
    radius(): number;
  }

  export class IfcOpenshellGeomTaxonomyCollection {
    readonly ptr: number;
    destroy(): void;
    addItem(item: IfcOpenshellGeomTaxonomyItem): void;
    itemAt(index: number): IfcOpenshellGeomTaxonomyItem;
    itemCount(): number;
  }

  export class IfcOpenshellGeomTaxonomyColour {
    readonly ptr: number;
    destroy(): void;
    getData(): number[];
  }

  export class IfcOpenshellGeomTaxonomyCylinder {
    readonly ptr: number;
    destroy(): void;
    matrix(): IfcOpenshellGeomTaxonomyMatrix4;
    radius(): number;
  }

  export class IfcOpenshellGeomTaxonomyDirection3 {
    readonly ptr: number;
    destroy(): void;
    getData(): number[];
  }

  export class IfcOpenshellGeomTaxonomyEdge {
    readonly ptr: number;
    destroy(): void;
  }

  export class IfcOpenshellGeomTaxonomyEllipse {
    readonly ptr: number;
    destroy(): void;
    matrix(): IfcOpenshellGeomTaxonomyMatrix4;
    radius1(): number;
    radius2(): number;
  }

  export class IfcOpenshellGeomTaxonomyExtrusion {
    readonly ptr: number;
    destroy(): void;
    basis(): IfcOpenshellGeomTaxonomyItem;
    depth(): number;
    direction(): IfcOpenshellGeomTaxonomyDirection3;
    matrix(): IfcOpenshellGeomTaxonomyMatrix4;
  }

  export class IfcOpenshellGeomTaxonomyFace {
    readonly ptr: number;
    destroy(): void;
    asItem(): IfcOpenshellGeomTaxonomyItem;
    basis(): IfcOpenshellGeomTaxonomyItem;
    loopAt(index: number): IfcOpenshellGeomTaxonomyLoop;
    loopCount(): number;
    matrix(): IfcOpenshellGeomTaxonomyMatrix4;
  }

  export class IfcOpenshellGeomTaxonomyItem {
    readonly ptr: number;
    destroy(): void;
    hash(): number;
    identity(): number;
    kind(): kinds;
  }

  export class IfcOpenshellGeomTaxonomyLine {
    readonly ptr: number;
    destroy(): void;
    asItem(): IfcOpenshellGeomTaxonomyItem;
    matrix(): IfcOpenshellGeomTaxonomyMatrix4;
  }

  export class IfcOpenshellGeomTaxonomyLoft {
    readonly ptr: number;
    destroy(): void;
    addItem(item: IfcOpenshellGeomTaxonomyItem): void;
    axis(): IfcOpenshellGeomTaxonomyItem;
    hasAxis(): boolean;
    itemAt(index: number): IfcOpenshellGeomTaxonomyItem;
    itemCount(): number;
    setAxis(value: IfcOpenshellGeomTaxonomyItem): void;
  }

  export class IfcOpenshellGeomTaxonomyLoop {
    readonly ptr: number;
    destroy(): void;
    edgeAt(index: number): IfcOpenshellGeomTaxonomyEdge;
    edgeCount(): number;
  }

  export class IfcOpenshellGeomTaxonomyMatrix4 {
    readonly ptr: number;
    destroy(): void;
    getData(): number[];
  }

  export class IfcOpenshellGeomTaxonomyNode {
    readonly ptr: number;
    destroy(): void;
  }

  export class IfcOpenshellGeomTaxonomyOffsetCurve {
    readonly ptr: number;
    destroy(): void;
    asItem(): IfcOpenshellGeomTaxonomyItem;
    basis(): IfcOpenshellGeomTaxonomyItem;
    offset(): number;
    reference(): IfcOpenshellGeomTaxonomyDirection3;
  }

  export class IfcOpenshellGeomTaxonomyPlane {
    readonly ptr: number;
    destroy(): void;
    matrix(): IfcOpenshellGeomTaxonomyMatrix4;
  }

  export class IfcOpenshellGeomTaxonomyPoint3 {
    readonly ptr: number;
    destroy(): void;
    getData(): number[];
  }

  export class IfcOpenshellGeomTaxonomyRevolve {
    readonly ptr: number;
    destroy(): void;
    angle(): number;
    axisOrigin(): IfcOpenshellGeomTaxonomyPoint3;
    basis(): IfcOpenshellGeomTaxonomyItem;
    direction(): IfcOpenshellGeomTaxonomyDirection3;
    hasAngle(): boolean;
    matrix(): IfcOpenshellGeomTaxonomyMatrix4;
  }

  export class IfcOpenshellGeomTaxonomyShell {
    readonly ptr: number;
    destroy(): void;
    faceAt(index: number): IfcOpenshellGeomTaxonomyFace;
    faceCount(): number;
  }

  export class IfcOpenshellGeomTaxonomySolid {
    readonly ptr: number;
    destroy(): void;
    matrix(): IfcOpenshellGeomTaxonomyMatrix4;
    shellAt(index: number): IfcOpenshellGeomTaxonomyShell;
    shellCount(): number;
  }

  export class IfcOpenshellGeomTaxonomySphere {
    readonly ptr: number;
    destroy(): void;
    matrix(): IfcOpenshellGeomTaxonomyMatrix4;
    radius(): number;
  }

  export class IfcOpenshellGeomTaxonomyStyle {
    readonly ptr: number;
    destroy(): void;
    diffuse(): IfcOpenshellGeomTaxonomyColour;
    hasSpecularity(): boolean;
    hasTransparency(): boolean;
    instanceId(): number;
    name(): string;
    specular(): IfcOpenshellGeomTaxonomyColour;
    specularity(): number;
    surface(): IfcOpenshellGeomTaxonomyColour;
    transparency(): number;
    useSurfaceColor(): boolean;
  }

  export class IfcOpenshellGeomTaxonomySweepAlongCurve {
    readonly ptr: number;
    destroy(): void;
    basis(): IfcOpenshellGeomTaxonomyItem;
    curve(): IfcOpenshellGeomTaxonomyItem;
    direction(): IfcOpenshellGeomTaxonomyDirection3;
    hasBasis(): boolean;
    hasCurve(): boolean;
    hasDirection(): boolean;
    hasMatrix(): boolean;
    hasSurface(): boolean;
    matrix(): IfcOpenshellGeomTaxonomyMatrix4;
    surface(): IfcOpenshellGeomTaxonomyItem;
  }

  export class IfcOpenshellGeomTaxonomyTorus {
    readonly ptr: number;
    destroy(): void;
    matrix(): IfcOpenshellGeomTaxonomyMatrix4;
    radius1(): number;
    radius2(): number;
  }

  export class IfcOpenshellGeomTransformation {
    readonly ptr: number;
    destroy(): void;
    matrix(): number[];
  }

  export class IfcOpenshellGeomTree {
    readonly ptr: number;
    destroy(): void;
    addFile(file: IfcOpenshellFile, settings: IfcOpenshellGeomSettings): void;
    addIterator(iterator: IfcOpenshellGeomIterator): void;
    clashAt(clashes: IfcOpenshellGeomTreeClashList, index: number): IfcOpenshellGeomTreeClash;
    clashClearanceMany(set_a: IfcOpenshellInstance[], set_b: IfcOpenshellInstance[], clearance: number, check_all: boolean): IfcOpenshellGeomTreeClashList;
    clashCollisionMany(set_a: IfcOpenshellInstance[], set_b: IfcOpenshellInstance[], allow_touching: boolean): IfcOpenshellGeomTreeClashList;
    clashCount(clashes: IfcOpenshellGeomTreeClashList): number;
    clashIntersectionMany(set_a: IfcOpenshellInstance[], set_b: IfcOpenshellInstance[], tolerance: number, check_all: boolean): IfcOpenshellGeomTreeClashList;
    distances(): number[];
    enableFaceStyles(): boolean;
    isManifold(faces: number[]): boolean;
    protrusionDistances(): number[];
    rayIntersectionAt(intersections: IfcOpenshellGeomTreeRayIntersectionList, index: number): IfcOpenshellGeomTreeRayIntersection;
    rayIntersectionCount(intersections: IfcOpenshellGeomTreeRayIntersectionList): number;
    selectBoxBounds(xmin: number, ymin: number, zmin: number, xmax: number, ymax: number, zmax: number, completely_within: boolean): IfcOpenshellParseInstanceList;
    selectBoxElement(instance: IfcOpenshellInstance, completely_within: boolean, extend: number): IfcOpenshellParseInstanceList;
    selectBoxPoint(x: number, y: number, z: number, extend: number): IfcOpenshellParseInstanceList;
    selectBrepElement(element: IfcOpenshellGeomBrepElement, completely_within: boolean, extend: number): IfcOpenshellParseInstanceList;
    selectElement(instance: IfcOpenshellInstance, completely_within: boolean, extend: number): IfcOpenshellParseInstanceList;
    selectPoint(x: number, y: number, z: number, extend: number): IfcOpenshellParseInstanceList;
    selectRay(origin_x: number, origin_y: number, origin_z: number, dir_x: number, dir_y: number, dir_z: number, length: number): IfcOpenshellGeomTreeRayIntersectionList;
    setEnableFaceStyles(enable: boolean): void;
    styleAt(index: number): IfcOpenshellGeomTaxonomyStyle;
    styleCount(): number;
    styles(): IfcOpenshellGeomTaxonomyStyle[];
    uint8ToB64(uuids_array: number[]): string;
  }

  export class IfcOpenshellGeomTreeClash {
    readonly ptr: number;
    destroy(): void;
    a(): IfcOpenshellInstance;
    b(): IfcOpenshellInstance;
    distance(): number;
    p1(): tree_point;
    p2(): tree_point;
    type(): number;
  }

  export class IfcOpenshellGeomTreeClashList {
    readonly ptr: number;
    destroy(): void;
  }

  export class IfcOpenshellGeomTreeRayIntersection {
    readonly ptr: number;
    destroy(): void;
    distance(): number;
    dotProduct(): number;
    instance(): IfcOpenshellInstance;
    normal(): tree_point;
    position(): tree_point;
    rayDistance(): number;
    styleIndex(): number;
  }

  export class IfcOpenshellGeomTreeRayIntersectionList {
    readonly ptr: number;
    destroy(): void;
  }

  export class IfcOpenshellGeomTriangulation {
    readonly ptr: number;
    destroy(): void;
    colorsBuffer(): Float64Array;
    colorsBuffer<T extends IfcOpenshellNumericTypedArray>(arrayType: IfcOpenshellNumericArrayConstructor<T>): T;
    colorsBufferSize(): number;
    edges(): number[];
    edgesBuffer(): Int32Array;
    edgesBuffer<T extends IfcOpenshellNumericTypedArray>(arrayType: IfcOpenshellNumericArrayConstructor<T>): T;
    edgesBufferSize(): number;
    edgesItemIds(): number[];
    edgesItemIdsBuffer(): Int32Array;
    edgesItemIdsBuffer<T extends IfcOpenshellNumericTypedArray>(arrayType: IfcOpenshellNumericArrayConstructor<T>): T;
    edgesItemIdsBufferSize(): number;
    faces(): number[];
    facesBuffer(): Int32Array;
    facesBuffer<T extends IfcOpenshellNumericTypedArray>(arrayType: IfcOpenshellNumericArrayConstructor<T>): T;
    facesBufferSize(): number;
    itemIds(): number[];
    itemIdsBuffer(): Int32Array;
    itemIdsBuffer<T extends IfcOpenshellNumericTypedArray>(arrayType: IfcOpenshellNumericArrayConstructor<T>): T;
    itemIdsBufferSize(): number;
    materialAt(index: number): IfcOpenshellGeomTaxonomyStyle;
    materialCount(): number;
    materialIds(): number[];
    materialIdsBuffer(): Int32Array;
    materialIdsBuffer<T extends IfcOpenshellNumericTypedArray>(arrayType: IfcOpenshellNumericArrayConstructor<T>): T;
    materialIdsBufferSize(): number;
    materials(): IfcOpenshellGeomTaxonomyStyle[];
    normals(): number[];
    normalsBuffer(): Float64Array;
    normalsBuffer<T extends IfcOpenshellNumericTypedArray>(arrayType: IfcOpenshellNumericArrayConstructor<T>): T;
    normalsBufferSize(): number;
    polyhedralFacesWithHoles(): number[][][];
    polyhedralFacesWithoutHoles(): number[][];
    uvs(): number[];
    uvsBuffer(): Float64Array;
    uvsBuffer<T extends IfcOpenshellNumericTypedArray>(arrayType: IfcOpenshellNumericArrayConstructor<T>): T;
    uvsBufferSize(): number;
    verts(): number[];
    vertsBuffer(): Float64Array;
    vertsBuffer<T extends IfcOpenshellNumericTypedArray>(arrayType: IfcOpenshellNumericArrayConstructor<T>): T;
    vertsBufferSize(): number;
  }

  export class IfcOpenshellGeomTriangulationElement {
    readonly ptr: number;
    destroy(): void;
    geometry(): IfcOpenshellGeomTriangulation;
  }

  export class IfcOpenshellTypeDeclaration {
    readonly ptr: number;
    destroy(): void;
    argumentTypes(): string[];
    asTypeDeclaration(): IfcOpenshellTypeDeclaration | null;
    declaredType(): IfcOpenshellParameterType | null;
  }

  export class IfcOpenshellValue {
    readonly ptr: number;
    destroy(): void;
  }

  export interface IfcOpenshellAggregateModule {
    /**
     * Assign products as parts of an aggregate object via IfcRelAggregates.
     *
     * Products already aggregated under a different parent are moved. Products
     * previously contained in a spatial structure (IfcRelContainedInSpatialStructure)
     * are removed from that containment. If an existing IfcRelAggregates
     * relationship already relates to the same parent, products are merged into it.
     */
    assignObject(file: IfcOpenshellFile, options: IfcOpenshellAggregateAssignObjectOptions): IfcOpenshellInstance;
    /**
     * Remove products from their IfcRelAggregates relationships.
     *
     * If no related objects remain after removal, the IfcRelAggregates
     * relationship itself is deleted.
     */
    unassignObject(file: IfcOpenshellFile, options: IfcOpenshellAggregateUnassignObjectOptions): void;
  }

  export interface IfcOpenshellAlignmentModule {
    /** Append an existing IfcAlignmentSegment to its matching semantic layout. */
    addSegmentToLayout(file: IfcOpenshellFile, layout: IfcOpenshellInstance, segment: IfcOpenshellInstance): IfcOpenshellAlignmentCreateLayoutSegmentResult;
    /** Add a station referent and keep the referent nest sorted by station. */
    addStationingReferent(file: IfcOpenshellFile, options: IfcOpenshellAlignmentAddStationingReferentOptions): IfcOpenshellInstance;
    /** Add a further vertical layout, moving existing vertical geometry to child alignments when required. */
    addVerticalLayout(file: IfcOpenshellFile, parent_alignment: IfcOpenshellInstance): IfcOpenshellInstance;
    /** Append the mandatory zero-length segment; returns false when already present or not applicable. */
    addZeroLengthSegment(file: IfcOpenshellFile, layout: IfcOpenshellInstance): boolean;
    /** Create an IFC4X3 alignment, its requested layouts, stationing, zero segments, and optional geometry. */
    create(file: IfcOpenshellFile, options: IfcOpenshellAlignmentCreateOptions): IfcOpenshellInstance;
    /** Create an alignment represented by an IfcOffsetCurveByDistances. */
    createAsOffsetCurve(file: IfcOpenshellFile, options: IfcOpenshellAlignmentCreateOffsetCurveOptions): IfcOpenshellInstance;
    /** Create an alignment represented by an IfcPolyline. */
    createAsPolyline(file: IfcOpenshellFile, options: IfcOpenshellAlignmentCreatePolylineOptions): IfcOpenshellInstance;
    /** Create an IFC4X3 horizontal and optional vertical alignment from PI records. */
    createByPiMethod(file: IfcOpenshellFile, options: IfcOpenshellAlignmentCreateByPiMethodOptions): IfcOpenshellInstance;
    /** Create one or more alignments from the alignment CSV text contract. */
    createFromCsvText(file: IfcOpenshellFile, options: IfcOpenshellAlignmentCreateFromCsvTextOptions): IfcOpenshellInstance;
    /** Create and append one semantic layout segment, returning its optional 4x4 endpoint matrix. */
    createLayoutSegment(file: IfcOpenshellFile, layout: IfcOpenshellInstance, design_parameters: IfcOpenshellInstance): IfcOpenshellAlignmentCreateLayoutSegmentResult;
    /** Populate the geometric representation of a semantic alignment when absent. */
    createRepresentation(file: IfcOpenshellFile, alignment: IfcOpenshellInstance): void;
    /** Create per-segment product representations; Helmert 1:2 mappings are rejected. */
    createSegmentRepresentations(file: IfcOpenshellFile, alignment: IfcOpenshellInstance): void;
    defaultReferentLabel(previous_segment: IfcOpenshellInstance | null, segment: IfcOpenshellInstance | null): string;
    distanceAlongFromStation(file: IfcOpenshellFile, alignment: IfcOpenshellInstance, station: number): number;
    getAlignment(layout: IfcOpenshellInstance): IfcOpenshellInstance | null;
    getAlignmentLayoutNest(alignment: IfcOpenshellInstance): IfcOpenshellInstance | null;
    getAlignmentLayouts(alignment: IfcOpenshellInstance): IfcOpenshellParseInstanceList;
    getAlignmentSegmentNest(layout: IfcOpenshellInstance): IfcOpenshellInstance | null;
    getAlignmentStartStation(file: IfcOpenshellFile, alignment: IfcOpenshellInstance): number;
    getAxisSubcontext(file: IfcOpenshellFile): IfcOpenshellInstance;
    getBasisCurve(alignment: IfcOpenshellInstance): IfcOpenshellInstance | null;
    getCantLayout(alignment: IfcOpenshellInstance): IfcOpenshellInstance | null;
    getChildAlignments(alignment: IfcOpenshellInstance): IfcOpenshellParseInstanceList;
    getCurve(alignment: IfcOpenshellInstance): IfcOpenshellInstance | null;
    getCurveSegment(layout: IfcOpenshellInstance, segment: IfcOpenshellInstance): IfcOpenshellInstance | null;
    getCurveSegmentTransitionCode(segment: IfcOpenshellInstance, next_segment: IfcOpenshellInstance, position_tolerance?: number | null): string;
    getHorizontalLayout(alignment: IfcOpenshellInstance): IfcOpenshellInstance | null;
    getLayout(segment: IfcOpenshellInstance): IfcOpenshellInstance | null;
    getLayoutCurve(layout: IfcOpenshellInstance): IfcOpenshellInstance | null;
    getLayoutSegments(layout: IfcOpenshellInstance): IfcOpenshellParseInstanceList;
    getMappedSegments(layout_segment: IfcOpenshellInstance): IfcOpenshellParseInstanceList;
    getParentAlignment(alignment: IfcOpenshellInstance): IfcOpenshellInstance | null;
    getReferentNest(alignment: IfcOpenshellInstance): IfcOpenshellInstance | null;
    getVerticalLayout(alignment: IfcOpenshellInstance): IfcOpenshellInstance | null;
    hasZeroLengthSegment(layout: IfcOpenshellInstance): boolean;
    layoutHorizontalByPiMethod(file: IfcOpenshellFile, layout: IfcOpenshellInstance, options: IfcOpenshellAlignmentLayoutHorizontalByPiMethodOptions): void;
    layoutVerticalByPiMethod(file: IfcOpenshellFile, layout: IfcOpenshellInstance, options: IfcOpenshellAlignmentLayoutVerticalByPiMethodOptions): void;
    /** Map one semantic segment. A Helmert segment returns both mapped halves. */
    mapSegment(file: IfcOpenshellFile, options: IfcOpenshellAlignmentMapSegmentOptions): IfcOpenshellParseInstanceList;
    nameSegments(prefix: string, layout: IfcOpenshellInstance): void;
    stationAsString(file: IfcOpenshellFile, station: number): string;
    updateCurveSegmentTransitionCode(segment: IfcOpenshellInstance, next_segment: IfcOpenshellInstance, position_tolerance?: number | null): void;
    updateEndPoint(file: IfcOpenshellFile, curve: IfcOpenshellInstance): void;
    updateFallbackPosition(file: IfcOpenshellFile, linear_placement: IfcOpenshellInstance): void;
  }

  export interface IfcOpenshellAttributeModule {
    /**
     * Edit arbitrary attributes on a product.
     *
     * Applies the attribute values from the property bag to the product.
     * Optionally synchronizes PredefinedType when ElementType or ObjectType
     * changes, and optionally updates OwnerHistory.
     *
     * @param file The IFC file containing the product.
     * @param options Attribute editing options.
     */
    editAttributes(file: IfcOpenshellFile, options: IfcOpenshellAttributeEditAttributesOptions): void;
  }

  export interface IfcOpenshellBoundaryModule {
    /** Assign a planar connection geometry to a space boundary relationship. */
    assignConnectionGeometry(file: IfcOpenshellFile, rel_space_boundary: IfcOpenshellInstance, options: IfcOpenshellBoundaryAssignConnectionGeometryOptions): void;
    /**
     * Create a copy of a space boundary relationship and its connection geometry.
     *
     * @param file File that receives the copied entities.
     * @param boundary IfcRelSpaceBoundary entity to copy.
     * @return Newly created boundary relationship, or no result if the copy cannot be created.
     */
    copyBoundary(file: IfcOpenshellFile, boundary: IfcOpenshellInstance): IfcOpenshellInstance;
    /**
     * Edit attributes of a space boundary relationship.
     *
     * Updates the relating space, related building element, and boundary
     * classification. ParentBoundary and CorrespondingBoundary are set only when
     * the schema supports them (IFC4+). When omitted, those attributes are cleared.
     *
     * @param entity IfcRelSpaceBoundary entity to modify.
     * @param options Attribute values to set.
     */
    editAttributes(entity: IfcOpenshellInstance, options: IfcOpenshellBoundaryEditAttributesOptions): void;
    /**
     * Remove a space boundary relationship and its connection geometry.
     *
     * Removes the connection geometry and then removes the boundary relationship.
     * Unreferenced entities belonging to the connection geometry are removed.
     *
     * @param file IFC file containing the boundary.
     * @param boundary IfcRelSpaceBoundary entity to remove.
     */
    removeBoundary(file: IfcOpenshellFile, boundary: IfcOpenshellInstance): void;
  }

  export interface IfcOpenshellClassificationModule {
    /**
     * Create a new IfcClassification and associate it with the project.
     *
     * The classification is linked to the first IfcProject via
     * IfcRelAssociatesClassification so that it persists in the file.
     */
    addClassification(file: IfcOpenshellFile, name: string): IfcOpenshellInstance;
    /**
     * Add a classification reference and associate it with products.
     *
     * If an existing classification reference is provided, it is used directly.
     * Otherwise, a new IfcClassificationReference is created using the
     * optional identification, name, and classification fields.
     */
    addReference(file: IfcOpenshellFile, options: IfcOpenshellClassificationAddReferenceOptions): IfcOpenshellInstance;
    /** Edit an IfcClassification using the shared attribute property writer. */
    editClassification(file: IfcOpenshellFile, classification: IfcOpenshellInstance, attributes: number): void;
    /** Edit an IfcClassificationReference using the shared attribute property writer. */
    editReference(file: IfcOpenshellFile, reference: IfcOpenshellInstance, attributes: number): void;
    /**
     * Return all classification references associated with an element.
     *
     * For IfcRoot-derived elements, returns references from IfcRelAssociatesClassification.
     * For non-IfcRoot elements (e.g. IfcMaterial), returns references via
     * IfcExternalReferenceRelationship. When should_inherit is true, references
     * from the element's type are merged, with occurrence-level references
     * overriding type-level ones within the same classification system.
     */
    getReferences(element: IfcOpenshellInstance, should_inherit: boolean): IfcOpenshellParseInstanceList;
    /**
     * Remove an IfcClassification and all its references.
     *
     * For IFC4+, recursively deletes every IfcClassificationReference in the
     * classification hierarchy via HasReferences. For IFC2X3, deletes only
     * references whose ReferencedSource is the classification itself; nested
     * references are not traversed and may be orphaned. Any
     * IfcRelAssociatesClassification that becomes orphaned is also deleted.
     */
    removeClassification(file: IfcOpenshellFile, classification: IfcOpenshellInstance): void;
    /**
     * Remove a classification reference association from products.
     *
     * If the reference is no longer associated with any products after
     * removal, the reference entity itself is also deleted.
     */
    removeReference(file: IfcOpenshellFile, options: IfcOpenshellClassificationRemoveReferenceOptions): void;
  }

  export interface IfcOpenshellCogoModule {
    /**
     * Add a single survey point as an IfcAnnotation.
     *
     * Creates an IfcAnnotation with PredefinedType SURVEY, wraps the given
     * IfcPoint in an IfcShapeRepresentation (Annotation/Point), and places
     * the annotation in the given or first IfcSite. The annotation's
     * ObjectPlacement is set to the world coordinate system of the
     * Model/Annotation/MODEL_VIEW representation context.
     *
     * @param file File that receives the new entities.
     * @param options Survey point geometry and placement options.
     * @return The newly created IfcAnnotation, or no result if creation fails.
     */
    addSurveyPoint(file: IfcOpenshellFile, options: IfcOpenshellCogoAddSurveyPointOptions): IfcOpenshellInstance;
    /**
     * Replace the survey point geometry of an existing annotation.
     *
     * Replaces the annotation's existing survey point with the given IfcPoint.
     * The annotation must already have a shape representation.
     *
     * @param annotation IfcAnnotation whose survey point to replace.
     * @param survey_point IfcPoint to assign as the new geometry.
     */
    assignSurveyPoint(annotation: IfcOpenshellInstance, survey_point: IfcOpenshellInstance): void;
    /**
     * Convert a quadrant bearing to decimal degrees.
     *
     * Accepts N/S, degrees, optional minutes and decimal seconds, and E/W,
     * separated by arbitrary whitespace. Invalid input is a value error with the
     * stable invalid-quadrant-bearing code; its message is diagnostic only.
     */
    bearing2dd(bearing: string): number;
    /**
     * Update the coordinates of the survey point inside an existing annotation.
     *
     * Updates the coordinates of the annotation's survey point. If the existing
     * point is two-dimensional, only x and y are written; otherwise all three
     * coordinates are used.
     *
     * @param annotation IfcAnnotation containing the survey point.
     * @param x Easting or X coordinate in model units.
     * @param y Northing or Y coordinate in model units.
     * @param z Elevation or Z coordinate in model units.
     */
    editSurveyPoint(annotation: IfcOpenshellInstance, x: number, y: number, z: number): void;
  }

  export interface IfcOpenshellComputeModule {
    /**
     * Compute a derived attribute value for an instance.
     *
     * Evaluates derived attributes defined in the IFC schema (e.g.
     * IfcDirection.DirectionRatios) for the given instance and attribute.
     *
     * @param instance The entity instance.
     * @param attribute_name The name of the derived attribute.
     * @return The computed value, or no result if it cannot be computed. Release it with value_free.
     */
    derived(instance: IfcOpenshellInstance, attribute_name: string): IfcOpenshellValue | null;
  }

  export interface IfcOpenshellConstraintModule {
    /**
     * Add a new IfcMetric constraint. If an objective is provided, the metric
     * is appended to the objective's benchmark values.
     */
    addMetric(file: IfcOpenshellFile, objective: IfcOpenshellInstance | null): IfcOpenshellInstance;
    /**
     * Create a chain of IfcReference entities from a dot-separated path and
     * assign it to a metric's ReferencePath attribute.
     *
     * For example, a path "Pset_WallCommon.FireRating" produces two IfcReference
     * entities linked by InnerReference, with AttributeIdentifier set to
     * "Pset_WallCommon" and "FireRating" respectively.
     *
     * @return The created IfcReference chain in order from outermost to innermost.
     */
    addMetricReference(file: IfcOpenshellFile, metric: IfcOpenshellInstance, reference_path: string): IfcOpenshellParseInstanceList;
    /**
     * Create a new IfcObjective constraint with default attributes.
     *
     * Sets Name to "Unnamed", ConstraintGrade and ObjectiveQualifier to "NOTDEFINED".
     */
    addObjective(file: IfcOpenshellFile): IfcOpenshellInstance;
    /**
     * Assign a constraint to a list of products via IfcRelAssociatesConstraint.
     *
     * If the constraint is already associated with some of the products, only
     * new products are added to the existing relationship.
     */
    assignConstraint(file: IfcOpenshellFile, options: IfcOpenshellConstraintAssignConstraintOptions): IfcOpenshellInstance;
    /** Edit an IfcMetric using the shared attribute property writer. */
    editMetric(file: IfcOpenshellFile, metric: IfcOpenshellInstance, attributes: number): void;
    /** Edit an IfcObjective using the shared attribute property writer. */
    editObjective(file: IfcOpenshellFile, objective: IfcOpenshellInstance, attributes: number): void;
    /**
     * Remove a constraint entity and clean up orphaned IfcRelAssociatesConstraint
     * relationships that reference it.
     */
    removeConstraint(file: IfcOpenshellFile, constraint: IfcOpenshellInstance): void;
    /**
     * Remove an IfcMetric and its reference path chain.
     *
     * Deletes the metric's IfcReference chain (via InnerReference), then removes
     * the metric entity. Orphaned IfcRelAssociatesConstraint and
     * IfcResourceConstraintRelationship entities are also deleted.
     */
    removeMetric(file: IfcOpenshellFile, metric: IfcOpenshellInstance): void;
    /**
     * Remove constraint associations from products.
     *
     * Products are removed from existing IfcRelAssociatesConstraint
     * relationships. If no products remain, the relationship is removed.
     */
    unassignConstraint(file: IfcOpenshellFile, options: IfcOpenshellConstraintUnassignConstraintOptions): void;
  }

  export interface IfcOpenshellContextModule {
    /**
     * Create a geometric representation context or subcontext.
     *
     * When parent is omitted, creates an IfcGeometricRepresentationContext with
     * a world coordinate system and attaches it to the IfcProject's
     * RepresentationContexts. A context_type of "Plan" creates a 2D context
     * (coordinate space dimension 2); all other values create a 3D context.
     *
     * When parent is provided, creates an IfcGeometricRepresentationSubContext
     * as a child of the given parent context.
     */
    addContext(file: IfcOpenshellFile, options: IfcOpenshellContextAddContextOptions): IfcOpenshellInstance;
    /**
     * Edit attributes of an existing geometric representation context.
     *
     * Applies attribute key-value pairs from the props builder to the context entity.
     */
    editContext(file: IfcOpenshellFile, context: IfcOpenshellInstance, attributes: number): void;
    /**
     * Remove a geometric representation context and its subcontexts recursively.
     *
     * For subcontexts, IfcCoordinateOperation references are removed and other
     * referencing entities are redirected to the parent context. For top-level
     * contexts, representations using the context are unassigned from their
     * elements and removed.
     */
    removeContext(file: IfcOpenshellFile, context: IfcOpenshellInstance): void;
  }

  export interface IfcOpenshellControlModule {
    /**
     * Assign a planning control or constraint to objects via IfcRelAssignsToControl.
     *
     * Objects already assigned to the control are skipped. If an existing
     * IfcRelAssignsToControl relationship exists for the control, new objects
     * are merged into it.
     */
    assignControl(file: IfcOpenshellFile, options: IfcOpenshellControlAssignControlOptions): IfcOpenshellInstance;
    /**
     * Remove objects from an IfcRelAssignsToControl relationship.
     *
     * If no related objects remain after removal, the relationship is deleted.
     */
    unassignControl(file: IfcOpenshellFile, options: IfcOpenshellControlUnassignControlOptions): void;
  }

  export interface IfcOpenshellCostModule {
    /**
     * Create an IfcCostItem entity.
     *
     * When both cost_schedule and cost_item are provided, cost_schedule takes
     * precedence and the item is assigned to it via IfcRelAssignsToControl.
     * When only cost_item is provided, the item is nested under it via
     * IfcRelNests.
     *
     * @param file File that receives the new entity.
     * @param options Schedule/parent placement and ownership options.
     * @return Newly created IfcCostItem.
     */
    addCostItem(file: IfcOpenshellFile, options: IfcOpenshellCostAddCostItemOptions): IfcOpenshellInstance;
    /**
     * Create an IfcPhysicalQuantity and add it to a cost item.
     *
     * Creates a quantity of the given IFC class (e.g. "IfcQuantityLength",
     * "IfcQuantityCount") with Name "Unnamed" and appends it to the cost item's
     * CostQuantities aggregate. For IfcQuantityCount, the initial value is set
     * to the number of controlled objects.
     *
     * @param file File that receives the new entity.
     * @param cost_item IfcCostItem to receive the quantity.
     * @param ifc_class IFC quantity class name.
     * @return Newly created IfcPhysicalQuantity.
     */
    addCostItemQuantity(file: IfcOpenshellFile, cost_item: IfcOpenshellInstance, ifc_class: string): IfcOpenshellInstance;
    /**
     * Create an IfcCostSchedule entity.
     *
     * Creates the schedule with the given name, predefined type, and update date.
     * The update_date is stored as an IfcDateAndTime on IFC2X3 or as a string
     * on IFC4+.
     *
     * @param file File that receives the new entity.
     * @param name Schedule name. When omitted or empty, no name is assigned.
     * @param predefined_type IFC predefined type enum value (e.g. "BUDGET", "COSTPLAN").
     * @param update_date ISO 8601 date-time string for the UpdateDate attribute.
     * @param owner_history Owner history for the new entity. When omitted, no owner history is assigned.
     * @return Newly created IfcCostSchedule.
     */
    addCostSchedule(file: IfcOpenshellFile, name: string | null, predefined_type: string, update_date: string, owner_history: IfcOpenshellInstance | null): IfcOpenshellInstance;
    /**
     * Create an IfcCostValue and attach it to a parent entity.
     *
     * Appends the new IfcCostValue to the parent's CostValues (IfcCostItem),
     * BaseCosts (IfcConstructionResource), or Components (IfcCostValue)
     * aggregate, depending on the parent's type.
     *
     * @param file File that receives the new entity.
     * @param parent IfcCostItem, IfcConstructionResource, or IfcCostValue to receive the value.
     * @return Newly created IfcCostValue.
     */
    addCostValue(file: IfcOpenshellFile, parent: IfcOpenshellInstance): IfcOpenshellInstance;
    /**
     * Assign product quantities to a cost item.
     *
     * For each product, creates an IfcRelAssignsToControl linking the cost item
     * to the product. If prop_name is provided, matching quantities from the
     * products' IfcElementQuantity property sets are collected into the cost
     * item's CostQuantities. If prop_name is omitted or empty and the cost item has a
     * single IfcQuantityCount, its value is updated to the count of assigned
     * non-resource objects. IfcSpatialElement products are skipped.
     *
     * @param file File containing the cost item and products.
     * @param cost_item IfcCostItem to assign quantities to.
     * @param products Products whose quantities to collect.
     * @param prop_name Quantity property name to match. When omitted, no named quantity is collected.
     * @param options Ownership options for the assignment relationship.
     */
    assignCostItemQuantity(file: IfcOpenshellFile, cost_item: IfcOpenshellInstance, products: IfcOpenshellInstance[], prop_name: string | null, options: IfcOpenshellCostAssignCostItemQuantityOptions): void;
    /**
     * Assign a cost rate's values to a cost item.
     *
     * Removes the cost item's existing CostValues, then assigns the cost rate's
     * CostValues aggregate directly (sharing, not copying).
     *
     * @param file File containing both entities.
     * @param cost_item IfcCostItem to receive the values.
     * @param cost_rate IfcCostItem whose CostValues to assign.
     */
    assignCostValue(file: IfcOpenshellFile, cost_item: IfcOpenshellInstance, cost_rate: IfcOpenshellInstance): void;
    /**
     * Calculate and populate cost values from assigned resources.
     *
     * Removes existing CostValues from the cost item, then for each
     * IfcConstructionResource assigned (directly or via an IfcTask), creates
     * an IfcCostValue with the resource's base cost rate multiplied by its
     * quantity. Resources with day-based units are converted using an 8-hour
     * workday.
     *
     * @param file File containing the cost item.
     * @param cost_item IfcCostItem to populate.
     */
    calculateCostItemResourceValue(file: IfcOpenshellFile, cost_item: IfcOpenshellInstance): void;
    /**
     * Copy an IfcCostItem and its nested children.
     *
     * Creates independent copies of the cost item, nested child items, property
     * sets, and IfcRelDefinesByProperties relationships. The returned list contains
     * the new root item followed by its descendants.
     *
     * @param file File that receives the copied entities.
     * @param cost_item IfcCostItem to copy.
     * @return List of newly created IfcCostItem entities, with the root first.
     */
    copyCostItem(file: IfcOpenshellFile, cost_item: IfcOpenshellInstance): IfcOpenshellParseInstanceList;
    /**
     * Copy the cost values from one cost item to another.
     *
     * Removes existing CostValues from the destination, then creates independent
     * copies of the source values and their component trees.
     *
     * @param file File containing both cost items.
     * @param source IfcCostItem to copy values from.
     * @param destination IfcCostItem to copy values to.
     */
    copyCostItemValues(file: IfcOpenshellFile, source: IfcOpenshellInstance, destination: IfcOpenshellInstance): void;
    /**
     * Copy an IfcCostSchedule and all its controlled cost items.
     *
     * Creates an independent schedule and independent copies of each controlled
     * IfcCostItem, then assigns the copies to the new schedule.
     *
     * @param file File that receives the copied entities.
     * @param cost_schedule IfcCostSchedule to copy.
     * @param options Ownership options for the new schedule and its items.
     * @return Newly created IfcCostSchedule.
     */
    copyCostSchedule(file: IfcOpenshellFile, cost_schedule: IfcOpenshellInstance, options: IfcOpenshellCostCopyCostScheduleOptions): IfcOpenshellInstance;
    /**
     * Edit attributes of an IfcCostItem.
     *
     * Applies attribute changes from the property bag to the cost item.
     *
     * @param file File containing the cost item.
     * @param cost_item IfcCostItem entity to edit.
     * @param attributes Property bag of attribute name/value pairs.
     */
    editCostItem(file: IfcOpenshellFile, cost_item: IfcOpenshellInstance, attributes: number): void;
    /**
     * Edit attributes of an IfcPhysicalQuantity.
     *
     * Applies attribute changes from the property bag to the physical quantity.
     *
     * @param file File containing the quantity.
     * @param physical_quantity IfcPhysicalQuantity entity to edit.
     * @param attributes Property bag of attribute name/value pairs.
     */
    editCostItemQuantity(file: IfcOpenshellFile, physical_quantity: IfcOpenshellInstance, attributes: number): void;
    /**
     * Edit attributes of an IfcCostSchedule.
     *
     * Applies attribute changes from the property bag to the cost schedule.
     *
     * @param file File containing the cost schedule.
     * @param cost_schedule IfcCostSchedule entity to edit.
     * @param attributes Property bag of attribute name/value pairs.
     */
    editCostSchedule(file: IfcOpenshellFile, cost_schedule: IfcOpenshellInstance, attributes: number): void;
    /**
     * Edit attributes of an IfcCostValue.
     *
     * Applies attribute changes from the property bag. The AppliedValue attribute
     * is wrapped as IfcMonetaryMeasure. When edit_unit_basis is true, the
     * UnitBasis (IfcMeasureWithUnit) is replaced or cleared.
     *
     * @param file File containing the cost value.
     * @param cost_value IfcCostValue entity to edit.
     * @param attributes Property bag of attribute name/value pairs.
     * @param options Unit basis replacement options.
     */
    editCostValue(file: IfcOpenshellFile, cost_value: IfcOpenshellInstance, attributes: number, options?: IfcOpenshellCostEditCostValueOptions | null): void;
    /**
     * Set an IfcCostValue's attributes from a formula expression.
     *
     * Parses a text formula (e.g. "100*5", "sum(10+20)") and applies the
     * resulting value tree to the cost value's AppliedValue, Category,
     * ArithmeticOperator, and Component cost values.
     *
     * @param file File containing the cost value.
     * @param cost_value IfcCostValue entity to update.
     * @param formula Formula string to parse.
     */
    editCostValueFormula(file: IfcOpenshellFile, cost_value: IfcOpenshellInstance, formula: string): void;
    /**
     * Remove an IfcCostItem and its nested children from the file.
     *
     * Recursively removes nested child cost items, then removes the item's
     * IfcRelNests and IfcRelAssignsToControl relationships (when the item is
     * the sole RelatedObject), and finally removes the item itself.
     *
     * @param file File containing the cost item.
     * @param cost_item IfcCostItem to remove.
     */
    removeCostItem(file: IfcOpenshellFile, cost_item: IfcOpenshellInstance): void;
    /**
     * Remove a physical quantity from a cost item.
     *
     * If the quantity is only referenced by this cost item, it is deleted from
     * the file. Otherwise it is removed from the CostQuantities aggregate only.
     *
     * @param file File containing the cost item.
     * @param cost_item IfcCostItem that owns the quantity.
     * @param physical_quantity IfcPhysicalQuantity to remove.
     */
    removeCostItemQuantity(file: IfcOpenshellFile, cost_item: IfcOpenshellInstance, physical_quantity: IfcOpenshellInstance): void;
    /**
     * Remove an IfcCostSchedule and all its controlled cost items from the file.
     *
     * Removes each controlled IfcCostItem (recursively), then removes the
     * schedule's IfcRelAssignsToControl relationships and the schedule itself.
     *
     * @param file File containing the cost schedule.
     * @param cost_schedule IfcCostSchedule to remove.
     */
    removeCostSchedule(file: IfcOpenshellFile, cost_schedule: IfcOpenshellInstance): void;
    /**
     * Remove an IfcCostValue from its parent and the file.
     *
     * If the cost value is only referenced by this parent, it is deleted from
     * the file. Otherwise it is removed from the parent's CostValues, BaseCosts,
     * or Components aggregate, depending on the parent's type.
     *
     * @param file File containing the cost value.
     * @param parent IfcCostItem, IfcConstructionResource, or IfcCostValue that owns the value.
     * @param cost_value IfcCostValue to remove.
     */
    removeCostValue(file: IfcOpenshellFile, parent: IfcOpenshellInstance, cost_value: IfcOpenshellInstance): void;
    /**
     * Remove product quantity assignments from a cost item.
     *
     * Removes the cost item's control relationship over the given products and
     * strips any quantities from CostQuantities that are referenced by those
     * products' IfcElementQuantity property sets. If a lone IfcQuantityCount
     * remains, its value is updated to the remaining object count or removed
     * if zero.
     *
     * @param file File containing the cost item and products.
     * @param cost_item IfcCostItem to unassign from.
     * @param products Products to unassign.
     * @param options Ownership options for updating the relationship.
     */
    unassignCostItemQuantity(file: IfcOpenshellFile, cost_item: IfcOpenshellInstance, products: IfcOpenshellInstance[], options: IfcOpenshellCostUnassignCostItemQuantityOptions): void;
  }

  export interface IfcOpenshellDocumentModule {
    /**
     * Create a new IfcDocumentInformation and link it to a parent.
     *
     * If the parent is an IfcProject or IfcContext, the document is linked via
     * IfcRelAssociatesDocument. If the parent is another IfcDocumentInformation,
     * the new document is linked as a child via IfcDocumentInformationRelationship.
     * If parent is omitted, the first IfcProject is used.
     */
    addInformation(file: IfcOpenshellFile, options: IfcOpenshellDocumentAddInformationOptions): IfcOpenshellInstance;
    /**
     * Create a new IfcDocumentReference.
     *
     * If an IfcDocumentInformation is provided, the reference is linked to it
     * (via ReferencedDocument in IFC4+ or DocumentReferences in IFC2X3).
     */
    addReference(file: IfcOpenshellFile, information: IfcOpenshellInstance | null): IfcOpenshellInstance;
    /**
     * Assign a document (IfcDocumentInformation or IfcDocumentReference) to products.
     *
     * Creates or updates an IfcRelAssociatesDocument relationship. Products
     * already associated with the document are skipped.
     */
    assignDocument(file: IfcOpenshellFile, options: IfcOpenshellDocumentAssignDocumentOptions): IfcOpenshellInstance;
    /** Edit an IfcDocumentInformation using the shared attribute property writer. */
    editInformation(file: IfcOpenshellFile, information: IfcOpenshellInstance, attributes: number): void;
    /** Edit an IfcDocumentReference using the shared attribute property writer. */
    editReference(file: IfcOpenshellFile, reference: IfcOpenshellInstance, attributes: number): void;
    /**
     * Remove an IfcDocumentInformation and its entire document tree.
     *
     * Recursively deletes all child IfcDocumentReference entities, child
     * IfcDocumentInformation entities (via IsPointer relationships), and all
     * associated IfcRelAssociatesDocument relationships.
     */
    removeInformation(file: IfcOpenshellFile, information: IfcOpenshellInstance): void;
    /**
     * Remove an IfcDocumentReference and its association relationships.
     *
     * Deletes the reference entity and all IfcRelAssociatesDocument relationships
     * that reference it.
     */
    removeReference(file: IfcOpenshellFile, reference: IfcOpenshellInstance): void;
    /**
     * Remove products from a document association.
     *
     * Products are removed from IfcRelAssociatesDocument relationships. If no
     * products remain in a relationship, the relationship is deleted.
     */
    unassignDocument(file: IfcOpenshellFile, options: IfcOpenshellDocumentUnassignDocumentOptions): void;
  }

  export interface IfcOpenshellDrawingModule {
    /**
     * Assign a product to an annotation object via IfcRelAssignsToProduct.
     *
     * When the relating product is an IfcGridAxis, the assignment is created
     * against the owning IfcGrid with the axis tag as the relationship name;
     * a new IfcRelAssignsToProduct is always created for grid axes even if one
     * already exists for the same axis tag. For non-grid products, if an
     * existing IfcRelAssignsToProduct already references the relating product,
     * the related object is appended to its RelatedObjects aggregate instead
     * of creating a new relationship. Returns no result for an exact duplicate.
     *
     * @param file IFC file to modify.
     * @param options Assignment parameters.
     * @return IfcRelAssignsToProduct relationship, or no result for a duplicate or failure.
     */
    assignProduct(file: IfcOpenshellFile, options: IfcOpenshellDrawingAssignProductOptions): IfcOpenshellInstance;
    /** Edit an IfcTextLiteral using the shared attribute property writer. */
    editTextLiteral(file: IfcOpenshellFile, text_literal: IfcOpenshellInstance, attributes: number): void;
    /**
     * Remove a product assignment from an annotation object.
     *
     * Finds and removes the IfcRelAssignsToProduct relating the product to the
     * object. If the relationship contains only this one related object, the
     * entire relationship is removed; otherwise only the object is removed from
     * the RelatedObjects aggregate.
     *
     * @param file IFC file to modify.
     * @param options Unassignment parameters.
     */
    unassignProduct(file: IfcOpenshellFile, options: IfcOpenshellDrawingUnassignProductOptions): void;
  }

  export interface IfcOpenshellElementModule {
    /**
     * Return the aggregate parent of an element.
     *
     * Returns the RelatingObject of an IfcRelAggregates relationship. In IFC2X3,
     * returns no result when the decomposition uses IfcRelNests instead.
     *
     * @param instance The element to query.
     * @return The aggregate parent, or no result if the element is not aggregated.
     */
    getAggregate(instance: IfcOpenshellInstance): IfcOpenshellInstance | null;
    /**
     * Return elements directly contained in a spatial element.
     *
     * Returns RelatedElements from the spatial element's containment relationships.
     *
     * @param element The spatial element (e.g. IfcBuildingStorey).
     * @return List of contained elements.
     */
    getContained(element: IfcOpenshellInstance): IfcOpenshellParseInstanceList;
    /**
     * Return the spatial container of an element.
     *
     * By default considers indirect spatial containers (e.g. a building storey
     * for an element inside an aggregate). When
     * direct_only is true, only a direct ContainedInStructure relationship
     * is considered.
     *
     * @param instance The element to query.
     * @param options Container lookup options.
     * @return The spatial container, or no result if the element is not contained.
     */
    getContainer(instance: IfcOpenshellInstance, options: IfcOpenshellElementGetContainerOptions): IfcOpenshellInstance | null;
    /**
     * Return the controls assigned to an element.
     *
     * Returns controls from the element's IfcRelAssignsToControl relationships.
     *
     * @param element The element to query.
     * @return List of IfcControl entities.
     */
    getControls(element: IfcOpenshellInstance): IfcOpenshellParseInstanceList;
    /**
     * Return the full spatial decomposition of an element.
     *
     * Returns subelements related through containment, aggregation, openings,
     * fillings, and nesting. When is_recursive is true (default), the result
     * includes the full hierarchy in breadth-first order.
     *
     * @param element The root element.
     * @param options Decomposition traversal options.
     * @return Ordered list of decomposed subelements (excluding the root).
     */
    getDecomposition(element: IfcOpenshellInstance, options: IfcOpenshellElementGetDecompositionOptions): IfcOpenshellParseInstanceList;
    /**
     * Return elements assigned to a presentation layer.
     *
     * Returns elements whose geometry appears in AssignedItems of the
     * IfcPresentationLayerAssignment.
     *
     * @param layer The IfcPresentationLayerAssignment entity.
     * @return List of elements on the layer.
     */
    getElementsByLayer(layer: IfcOpenshellInstance): IfcOpenshellParseInstanceList;
    /**
     * Return elements that use a material, directly or via a material set.
     *
     * Returns elements associated through IfcRelAssociatesMaterial, including
     * elements using the material as part of a layer, profile, constituent, or
     * material list.
     *
     * @param material The IfcMaterial or material set entity.
     * @return List of elements using the material.
     */
    getElementsByMaterial(material: IfcOpenshellInstance): IfcOpenshellParseInstanceList;
    /**
     * Return elements that use a profile definition in their representation.
     *
     * Returns elements whose geometry references the profile through their
     * representation items.
     *
     * @param profile The IfcProfileDef entity.
     * @return List of elements using the profile.
     */
    getElementsByProfile(profile: IfcOpenshellInstance): IfcOpenshellParseInstanceList;
    /**
     * Return elements that use a geometric representation.
     *
     * Returns IfcProduct and IfcTypeProduct entities that reference the
     * representation through their product representation or representation map.
     *
     * @param representation The IfcShapeRepresentation entity.
     * @return List of elements using the representation.
     */
    getElementsByRepresentation(representation: IfcOpenshellInstance): IfcOpenshellParseInstanceList;
    /**
     * Return elements whose geometric representation uses a style.
     *
     * Returns elements whose shape representations contain the style through
     * IfcStyledItem relationships.
     *
     * @param style The IfcPresentationStyle entity.
     * @return List of elements using the style.
     */
    getElementsByStyle(style: IfcOpenshellInstance): IfcOpenshellParseInstanceList;
    /**
     * Return the opening element that an element fills.
     *
     * Returns the RelatingOpeningElement from the element's filling relationship.
     * This typically applies to windows and doors.
     *
     * @param element The filling element (e.g. IfcWindow).
     * @return The IfcOpeningElement being filled, or no result if none is associated.
     */
    getFilledVoid(element: IfcOpenshellInstance): IfcOpenshellInstance | null;
    /**
     * Return the groups that an element is assigned to.
     *
     * Returns groups from the element's IfcRelAssignsToGroup relationships.
     *
     * @param element The element to query.
     * @return List of IfcGroup entities.
     */
    getGroups(element: IfcOpenshellInstance): IfcOpenshellParseInstanceList;
    /**
     * Return the presentation layers that an element is part of.
     *
     * Returns IfcPresentationLayerAssignment entities referenced by the
     * element's representation.
     *
     * @param element The element to query.
     * @return List of IfcPresentationLayerAssignment entities.
     */
    getLayers(element: IfcOpenshellInstance): IfcOpenshellParseInstanceList;
    /**
     * Return the material associated with an element.
     *
     * Searches HasAssociations for IfcRelAssociatesMaterial. When
     * should_inherit is true (default), falls back to the element's type.
     * When should_skip_usage is true, unwraps material set usages
     * (IfcMaterialLayerSetUsage, IfcMaterialProfileSetUsage) to their
     * underlying set.
     *
     * @param instance The element to query.
     * @param options Material lookup options.
     * @return The material entity, or no result if none is associated.
     */
    getMaterial(instance: IfcOpenshellInstance, options: IfcOpenshellElementGetMaterialOptions): IfcOpenshellInstance | null;
    /**
     * Return the nest parent of an element.
     *
     * Returns the RelatingObject of the applicable IfcRelNests relationship for
     * the schema.
     *
     * @param instance The element to query.
     * @return The nesting parent, or no result if the element is not nested.
     */
    getNest(instance: IfcOpenshellInstance): IfcOpenshellInstance | null;
    /**
     * Return opening elements associated with an element.
     *
     * Returns RelatedOpeningElement values from the element's opening
     * relationships. Also includes openings inherited from aggregate parents.
     *
     * @param element The building element (e.g. IfcWall).
     * @return List of IfcOpeningElement entities.
     */
    getOpenings(element: IfcOpenshellInstance): IfcOpenshellParseInstanceList;
    /**
     * Return the parent of an element in the spatial hierarchy.
     *
     * Checks spatial containment, aggregation, nesting, filling, and voiding
     * relationships in that order, returning the first parent found.
     *
     * @param instance The element to query.
     * @return The parent element, or no result if the element is at the top of the hierarchy.
     */
    getParent(instance: IfcOpenshellInstance): IfcOpenshellInstance | null;
    /**
     * Return the direct aggregation parts of an element.
     *
     * Returns RelatedObjects from the element's IfcRelAggregates relationships.
     *
     * @param element The element to query.
     * @return List of aggregated parts.
     */
    getParts(element: IfcOpenshellInstance): IfcOpenshellParseInstanceList;
    /**
     * Return property set and quantity identifiers of an element.
     *
     * Returns IfcPropertySet, IfcElementQuantity, and related property definition
     * entities. For IfcTypeObject, uses HasPropertySets; for other objects, uses
     * the applicable property-definition relationship.
     * When should_inherit is true (default), also includes property sets
     * from the element's type.
     *
     * @param element The element to query.
     * @param options Property set filtering options.
     * @return List of property definition entities.
     */
    getPsetIds(element: IfcOpenshellInstance, options: IfcOpenshellElementGetPsetIdsOptions): IfcOpenshellParseInstanceList;
    /**
     * Return elements that have an external reference assigned.
     *
     * For IfcExternalReference subtypes, returns resources from the applicable
     * external-reference relationship. For classification, document, and library
     * references, returns elements from the corresponding IFC relationship.
     *
     * @param reference The IfcExternalReference or IfcExternalInformation entity.
     * @return List of elements using the reference.
     */
    getReferencedElements(reference: IfcOpenshellInstance): IfcOpenshellParseInstanceList;
    /**
     * Return spatial elements that reference an element.
     *
     * Returns RelatingStructure values from the element's spatial reference
     * relationships. This includes multi-storey elements and elements spanning
     * multiple spaces.
     *
     * @param element The element to query.
     * @return List of referenced IfcSpatialElement entities.
     */
    getReferencedStructures(element: IfcOpenshellInstance): IfcOpenshellParseInstanceList;
    /**
     * Return the shape aspects of an element.
     *
     * For an IfcProduct, returns shape aspects from its representation. For an
     * IfcTypeProduct, returns shape aspects from its representation maps. When
     * should_inherit is true (default), also includes shape aspects from
     * the element's type.
     *
     * @param element The IfcProduct or IfcTypeProduct.
     * @param options Shape aspect lookup options.
     * @return List of IfcShapeAspect entities.
     */
    getShapeAspects(element: IfcOpenshellInstance, options: IfcOpenshellElementGetShapeAspectsOptions): IfcOpenshellParseInstanceList;
    /**
     * Return elements referenced by a spatial structure.
     *
     * Returns RelatedElements from the spatial element's reference relationships.
     *
     * @param structure The spatial element (e.g. IfcBuildingStorey).
     * @return List of referenced elements.
     */
    getStructureReferencedElements(structure: IfcOpenshellInstance): IfcOpenshellParseInstanceList;
    /**
     * Return the surface styles used in an element's representation.
     *
     * Collects styles from the element's materials and body representation,
     * including styles on mapped items and boolean operands.
     *
     * @param element The element to query.
     * @return List of IfcSurfaceStyle entities.
     */
    getStyles(element: IfcOpenshellInstance): IfcOpenshellParseInstanceList;
    /**
     * Return the type element associated with an element occurrence.
     *
     * For an IfcTypeObject, returns the element itself. For an IfcObject,
     * returns the type assigned through the schema's type relationship.
     *
     * @param instance The element to query.
     * @return The related type element, or no result if none is assigned.
     */
    getType(instance: IfcOpenshellInstance): IfcOpenshellInstance | null;
    /**
     * Return all occurrences of a type element.
     *
     * Returns the RelatedObjects of the applicable type relationship for the
     * schema.
     *
     * @param type_element The type element (e.g. IfcWallType).
     * @return List of element occurrences of that type.
     */
    getTypes(type_element: IfcOpenshellInstance): IfcOpenshellParseInstanceList;
    /**
     * Return the building element voided by an opening.
     *
     * Returns the RelatingBuildingElement from the opening relationship.
     *
     * @param element The IfcOpeningElement.
     * @return The building element being voided, or no result if none is associated.
     */
    getVoidedElement(element: IfcOpenshellInstance): IfcOpenshellInstance | null;
    /**
     * Check whether an element's predefined type is user-defined.
     *
     * Returns true if the element's PredefinedType is USERDEFINED, or if
     * the type's PredefinedType is USERDEFINED or not set and an
     * ElementType or ObjectType is present.
     *
     * @param element The element to check.
     * @return True if the predefined type is user-defined.
     */
    isUserdefinedType(element: IfcOpenshellInstance): boolean;
    /**
     * Recursively remove an element and its owned subgraph.
     *
     * Removes the element and owned subelements that have no references outside
     * the removal set. Protected elements and externally referenced elements are
     * preserved.
     *
     * @param element The root element to remove.
     */
    removeDeep(element: IfcOpenshellInstance): void;
    /**
     * Replace all references to an element with another element.
     *
     * Replaces references to old_element in all inverse relationships with
     * references to new_element.
     *
     * @param old_element The element to be replaced.
     * @param new_element The replacement element.
     */
    replaceElement(old_element: IfcOpenshellInstance, new_element: IfcOpenshellInstance): void;
  }

  export interface IfcOpenshellEntityModule {
    /**
     * Remove an entity and the unshared entities it owns, recursively.
     *
     * Equivalent to entity_remove_deep_with_options with the default options.
     * The start element must have no inverses outside the subgraph.
     *
     * @param instance The root entity to remove.
     */
    removeDeep(instance: IfcOpenshellInstance): void;
    /**
     * Remove an entity and its owned subgraph with fine-grained control.
     *
     * An owned entity is removed only when it has no references from outside the
     * removal set. The also_consider list extends that set for this decision, and
     * the do_not_delete list protects specific entities from deletion.
     *
     * @param instance The root entity to remove.
     * @param options Additional control over the removal process.
     */
    removeDeepWithOptions(instance: IfcOpenshellInstance, options: IfcOpenshellEntityRemoveDeepOptions): void;
  }

  export interface IfcOpenshellFeatureModule {
    /**
     * Associate a feature element with a host element.
     *
     * For IfcFeatureElementSubtraction (e.g. IfcOpeningElement), creates
     * IfcRelVoidsElement. For IfcFeatureElementAddition (e.g. IfcProjectionElement),
     * creates IfcRelProjectsElement. For IfcSurfaceFeature, creates
     * IfcRelAdheresToElement (IFC4X3) or aggregates via IfcRelAggregates (IFC4).
     * If the feature is already associated with the same host, returns the
     * existing relationship. If associated with a different host, the old
     * relationship is removed first.
     */
    addFeature(file: IfcOpenshellFile, options: IfcOpenshellFeatureAddFeatureOptions): IfcOpenshellInstance;
    /**
     * Fill an opening with an element via IfcRelFillsElement.
     *
     * If the element already fills the same opening, returns the existing
     * relationship. If it fills a different opening, the old relationship is
     * removed first.
     */
    addFilling(file: IfcOpenshellFile, opening: IfcOpenshellInstance, element: IfcOpenshellInstance): IfcOpenshellInstance;
    /**
     * Remove a feature element and its relationships.
     *
     * For IfcFeatureElementSubtraction subclasses, removes the IfcRelVoidsElement.
     * For IfcFeatureElementAddition subclasses, removes the IfcRelProjectsElement.
     * For IfcSurfaceFeature in IFC4, unassigns from the aggregate parent. In
     * other schemas, no feature-specific relationship is removed before the
     * element itself is removed.
     * IfcOpeningElement fillings are also removed. Nested elements, property sets,
     * representations, and other inverse relationships are cleaned up as part of
     * removing the feature.
     */
    removeFeature(file: IfcOpenshellFile, options: IfcOpenshellFeatureRemoveFeatureOptions): void;
    /**
     * Remove a filling relationship for an element.
     *
     * Finds and deletes the IfcRelFillsElement where the element is the
     * RelatedBuildingElement.
     */
    removeFilling(file: IfcOpenshellFile, element: IfcOpenshellInstance): void;
  }

  export interface IfcOpenshellGeomModule {
    arrangePolygons(polygons_cpp: IfcOpenshellGeomSvgfillPolygon[]): IfcOpenshellGeomSvgfillPolygon[];
    convertLoopToFunctionItem(loop_item_cpp: IfcOpenshellGeomTaxonomyItem): IfcOpenshellGeomTaxonomyItem;
    createBuffer(): IfcOpenshellGeomBuffer;
    createBufferFromFilename(filename: string): IfcOpenshellGeomBuffer;
    createEpeckFromDouble(value: number): IfcOpenshellGeomOpaqueNumber | null;
    createEpeckFromInt(value: number): IfcOpenshellGeomOpaqueNumber | null;
    createEpeckFromString(value_cpp: string): IfcOpenshellGeomOpaqueNumber | null;
    createFunctionItemEvaluator(settings_cpp: IfcOpenshellGeomSettings, fn_item_cpp: IfcOpenshellGeomTaxonomyItem): IfcOpenshellGeomFunctionItemEvaluator | null;
    createGeometrySerializerByPath(format: string, output_filename: string, output_temp_filename: string, geometry_settings: IfcOpenshellGeomSettings, serializer_settings: IfcOpenshellGeomSerializerSettings): IfcOpenshellGeomGeometrySerializer | null;
    createGeometrySerializerByStream(format: string, output: IfcOpenshellGeomBuffer, output_temp: IfcOpenshellGeomBuffer, geometry_settings: IfcOpenshellGeomSettings, serializer_settings: IfcOpenshellGeomSerializerSettings): IfcOpenshellGeomGeometrySerializer | null;
    createIterator(geometry_library_cpp: string, settings_cpp: IfcOpenshellGeomSettings, file_cpp: IfcOpenshellFile, num_threads: number): IfcOpenshellGeomIterator | null;
    createIteratorWithIncludeExclude(geometry_library_cpp: string, settings_cpp: IfcOpenshellGeomSettings, file_cpp: IfcOpenshellFile, elems_cpp: string[], include: boolean, num_threads: number): IfcOpenshellGeomIterator | null;
    createIteratorWithIncludeExcludeGlobalid(geometry_library_cpp: string, settings_cpp: IfcOpenshellGeomSettings, file_cpp: IfcOpenshellFile, elems_cpp: string[], include: boolean, num_threads: number): IfcOpenshellGeomIterator | null;
    createIteratorWithIncludeExcludeId(geometry_library_cpp: string, settings_cpp: IfcOpenshellGeomSettings, file_cpp: IfcOpenshellFile, elems_cpp: number[], include: boolean, num_threads: number): IfcOpenshellGeomIterator | null;
    createJsonSerializer(file: IfcOpenshellFile, filename: string): IfcOpenshellGeomSerializer;
    createRocksdbSerializerStreaming(input_filename: string, rocksdb_filename: string): IfcOpenshellGeomSerializer;
    createSerializerSettings(): IfcOpenshellGeomSerializerSettings;
    createSettings(): IfcOpenshellGeomSettings;
    createShape(settings_cpp: IfcOpenshellGeomSettings, instance_cpp: IfcOpenshellInstance, representation: IfcOpenshellInstance | null, geometry_library: string | null): IfcOpenshellGeomElement | null;
    createTree(): IfcOpenshellGeomTree;
    createTreeFromFile(file: IfcOpenshellFile): IfcOpenshellGeomTree;
    createTreeFromFileWithSettings(file: IfcOpenshellFile, settings: IfcOpenshellGeomSettings): IfcOpenshellGeomTree;
    createTreeFromIterator(iterator: IfcOpenshellGeomIterator): IfcOpenshellGeomTree;
    createXmlSerializer(file: IfcOpenshellFile, filename: string): IfcOpenshellGeomSerializer;
    helmertCurvePoint(A0: number, A1: number, A2: number, s: number): number[];
    lineSegmentsToPolygons(solver: number, eps: number, segments_json_cpp: string): IfcOpenshellGeomSvgfillPolygon[];
    mapShape(settings_cpp: IfcOpenshellGeomSettings, instance_cpp: IfcOpenshellInstance): IfcOpenshellGeomTaxonomyItem;
    naryUnion(shapes_cpp: IfcOpenshellGeomConversionResultShape[]): IfcOpenshellGeomConversionResultShape | null;
    svgToLineSegments(svg_data_cpp: string, class_name: string | null): string;
    svgToPolygons(svg_data_cpp: string, class_name: string | null): IfcOpenshellGeomSvgfillPolygon[];
    taxonomyCreateBooleanResult(operation: number): IfcOpenshellGeomTaxonomyBooleanResult;
    taxonomyCreateBox(dx: number, dy: number, dz: number): IfcOpenshellGeomTaxonomySolid;
    taxonomyCreateBsplineCurve(degree: number): IfcOpenshellGeomTaxonomyBsplineCurve;
    taxonomyCreateBsplineSurface(degree_u: number, degree_v: number): IfcOpenshellGeomTaxonomyBsplineSurface;
    taxonomyCreateCircle(origin_x: number, origin_y: number, origin_z: number, dir_x: number, dir_y: number, dir_z: number, radius: number): IfcOpenshellGeomTaxonomyCircle;
    taxonomyCreateCollection(): IfcOpenshellGeomTaxonomyCollection;
    taxonomyCreateCylinder(origin_x: number, origin_y: number, origin_z: number, dir_x: number, dir_y: number, dir_z: number, radius: number): IfcOpenshellGeomTaxonomyCylinder;
    taxonomyCreateDirection3(x: number, y: number, z: number): IfcOpenshellGeomTaxonomyDirection3;
    taxonomyCreateEllipse(origin_x: number, origin_y: number, origin_z: number, dir_x: number, dir_y: number, dir_z: number, radius1: number, radius2: number): IfcOpenshellGeomTaxonomyEllipse;
    taxonomyCreateExtrusion(basis_cpp: IfcOpenshellGeomTaxonomyItem, direction_cpp: IfcOpenshellGeomTaxonomyDirection3, depth: number): IfcOpenshellGeomTaxonomyExtrusion;
    taxonomyCreateLine(origin_x: number, origin_y: number, origin_z: number, dir_x: number, dir_y: number, dir_z: number): IfcOpenshellGeomTaxonomyLine;
    taxonomyCreateLoft(): IfcOpenshellGeomTaxonomyLoft;
    taxonomyCreateNode(): IfcOpenshellGeomTaxonomyNode;
    taxonomyCreateOffsetCurve(basis: IfcOpenshellGeomTaxonomyItem, reference: IfcOpenshellGeomTaxonomyDirection3, offset: number): IfcOpenshellGeomTaxonomyOffsetCurve;
    taxonomyCreatePlane(origin_x: number, origin_y: number, origin_z: number, dir_x: number, dir_y: number, dir_z: number): IfcOpenshellGeomTaxonomyPlane;
    taxonomyCreatePoint3(x: number, y: number, z: number): IfcOpenshellGeomTaxonomyPoint3;
    taxonomyCreateRevolve(basis_cpp: IfcOpenshellGeomTaxonomyItem, axis_origin_cpp: IfcOpenshellGeomTaxonomyPoint3, direction_cpp: IfcOpenshellGeomTaxonomyDirection3, angle: number): IfcOpenshellGeomTaxonomyRevolve;
    taxonomyCreateSphere(origin_x: number, origin_y: number, origin_z: number, dir_x: number, dir_y: number, dir_z: number, radius: number): IfcOpenshellGeomTaxonomySphere;
    taxonomyCreateSweepAlongCurve(basis_face_cpp: IfcOpenshellGeomTaxonomyFace, directrix_cpp: IfcOpenshellGeomTaxonomyItem, reference_direction_cpp: IfcOpenshellGeomTaxonomyDirection3): IfcOpenshellGeomTaxonomySweepAlongCurve;
    taxonomyCreateTorus(origin_x: number, origin_y: number, origin_z: number, dir_x: number, dir_y: number, dir_z: number, radius1: number, radius2: number): IfcOpenshellGeomTaxonomyTorus;
    taxonomyFunctionItemEnd(item_cpp: IfcOpenshellGeomTaxonomyItem): number;
    taxonomyFunctionItemStart(item_cpp: IfcOpenshellGeomTaxonomyItem): number;
  }

  export interface IfcOpenshellGeometryModule {
    /**
     * Create an axis representation (Curve2D or Curve3D) from a polyline.
     *
     * Points are converted from SI metres to project units.
     *
     * @param file IFC file that receives the representation.
     * @param context IfcGeometricRepresentationContext.
     * @param axis Ordered XY or XYZ points defining the axis curve.
     * @return IfcShapeRepresentation entity, or no result if creation fails.
     */
    addAxisRepresentation(file: IfcOpenshellFile, context: IfcOpenshellInstance, axis: [number, number][] | [number, number, number][]): IfcOpenshellInstance;
    /**
     * Add boolean operands to a solid representation item.
     *
     * Creates IfcBooleanResult entities (or IfcBooleanClippingResult for
     * DIFFERENCE with half-space solids) by combining the first item with each
     * additional operand. The returned entities are listed in creation order.
     *
     * @param file IFC file that receives the boolean entities.
     * @param first_item Base solid operand.
     * @param second_items Additional operands to apply.
     * @param operator_type Boolean operator: "DIFFERENCE", "UNION", or "INTERSECTION".
     * @return Created boolean result entities, or an empty list if creation fails.
     */
    addBoolean(file: IfcOpenshellFile, first_item: IfcOpenshellInstance, second_items: IfcOpenshellInstance[], operator_type: GeometryBooleanOperator): IfcOpenshellParseInstanceList;
    /**
     * Create a door representation with lining and panel geometry.
     *
     * @param file IFC file that receives the representation.
     * @param options Door dimensions, operation type, and lining/panel properties.
     * @return IfcShapeRepresentation entity, or no result if creation fails.
     */
    addDoorRepresentation(file: IfcOpenshellFile, options: IfcOpenshellGeometryAddDoorRepresentationOptions): IfcOpenshellInstance;
    /**
     * Create a footprint representation (GeometricCurveSet) from curves.
     *
     * @param file IFC file that receives the representation.
     * @param context IfcGeometricRepresentationContext.
     * @param curves IfcCurve entities to include in the footprint.
     * @return IfcShapeRepresentation entity, or no result if creation fails.
     */
    addFootprintRepresentation(file: IfcOpenshellFile, context: IfcOpenshellInstance, curves: IfcOpenshellInstance[]): IfcOpenshellInstance;
    /**
     * Create a mesh representation from vertices and face indices.
     *
     * Uses IfcPolygonalFaceSet (IFC4+) or IfcFacetedBrep (IFC2X3). IFC2X3
     * always uses faceted BRep regardless of force_faceted_brep.
     *
     * @param file IFC file that receives the representation.
     * @param context IfcGeometricRepresentationContext.
     * Each item binds its vertex list to its faces. Face indices are zero-based.
     * Polygonal face sets support optional inner loops; IFC2X3 and forced faceted
     * BReps reject inner loops. Edges without faces are not supported upstream and
     * are intentionally absent from this native contract.
     *
     * Vertices are divided by unit_scale, then coordinate_offset (in project
     * units) is added. If omitted, unit_scale is calculated from the file.
     *
     * @param options Mesh items, coordinate conversion, and optional faceted BRep override.
     * @return IfcShapeRepresentation entity, or no result if creation fails.
     */
    addMeshRepresentation(file: IfcOpenshellFile, context: IfcOpenshellInstance, options: IfcOpenshellGeometryAddMeshRepresentationOptions): IfcOpenshellInstance;
    /**
     * Create a profile-based IfcExtrudedAreaSolid representation.
     *
     * Depth and plane locations are supplied in SI metres and converted to project
     * length units. Clipping kinds preserve input order but are applied from last
     * to first; entity clippings are copied before their FirstOperand is changed.
     * The placement defaults to Z=(0,0,1), X=(1,0,0), and the origin when no
     * cardinal point is supplied. The result is SweptSolid without clippings and
     * Clipping otherwise.
     *
     * @param file IFC file that receives the representation.
     * @param options Context, profile, extrusion, placement, cardinal point, and clippings.
     * @return IfcShapeRepresentation entity, or no result if creation fails.
     */
    addProfileRepresentation(file: IfcOpenshellFile, options: IfcOpenshellGeometryAddProfileRepresentationOptions): IfcOpenshellInstance;
    /**
     * Create a railing representation from the shared pure-compute result.
     *
     * @param file IFC file that receives the representation.
     * @param options Context plus optional path, dimensions, terminal policy, and unit scale.
     * @return IfcShapeRepresentation entity, or no result if creation fails.
     */
    addRailingRepresentation(file: IfcOpenshellFile, options: IfcOpenshellGeometryAddRailingRepresentationOptions): IfcOpenshellInstance;
    /**
     * Create or update an IfcShapeAspect within a product definition shape.
     *
     * If an aspect with the same name already exists, its items are merged.
     * Items are removed from other aspects in the same product definition shape.
     *
     * @param file IFC file that receives the aspect.
     * @param options Aspect name, items, representation, and owning product.
     * @return IfcShapeAspect entity, or no result if creation fails.
     */
    addShapeAspect(file: IfcOpenshellFile, options: IfcOpenshellGeometryAddShapeAspectOptions): IfcOpenshellInstance;
    /**
     * Create a slab-style swept solid representation (IfcExtrudedAreaSolid).
     *
     * @param file IFC file that receives the representation.
     * @param options Slab dimensions, direction, clippings, and boundary polyline.
     * @return IfcShapeRepresentation entity, or no result if creation fails.
     */
    addSlabRepresentation(file: IfcOpenshellFile, options: IfcOpenshellGeometryAddSlabRepresentationOptions): IfcOpenshellInstance;
    /**
     * Create an IfcTopologyRepresentation for a single topology item.
     *
     * @param file IFC file that receives the representation.
     * @param options Context, topology item, and optional identifier/type.
     * @return IfcTopologyRepresentation entity, or no result if creation fails.
     */
    addTopologyRepresentation(file: IfcOpenshellFile, options: IfcOpenshellGeometryAddTopologyRepresentationOptions): IfcOpenshellInstance;
    /**
     * Create a wall-style swept solid representation (IfcExtrudedAreaSolid).
     *
     * @param file IFC file that receives the representation.
     * @param options Wall dimensions, direction, clippings, and booleans.
     * @return IfcShapeRepresentation entity, or no result if creation fails.
     */
    addWallRepresentation(file: IfcOpenshellFile, options: IfcOpenshellGeometryAddWallRepresentationOptions): IfcOpenshellInstance;
    /**
     * Create a window representation with lining and panel geometry.
     *
     * @param file IFC file that receives the representation.
     * @param options Window dimensions, partition type, and semantic lining/panel properties.
     * @return IfcShapeRepresentation entity, or no result if creation fails.
     */
    addWindowRepresentation(file: IfcOpenshellFile, options: IfcOpenshellGeometryAddWindowRepresentationOptions): IfcOpenshellInstance;
    /**
     * Assign a representation to a product or type product.
     *
     * For IfcProduct, the representation is appended to the product's
     * IfcProductDefinitionShape. For IfcTypeProduct, an IfcRepresentationMap is
     * created and mapped representations are assigned to all related occurrences.
     * If the product has a type with existing maps and the representation is not
     * already mapped, the assignment is redirected to the type product.
     *
     * @param file IFC file to modify.
     * @param product IfcProduct or IfcTypeProduct entity.
     * @param representation IfcShapeRepresentation entity.
     * @return The product receiving the representation, or no result if assignment fails.
     */
    assignRepresentation(file: IfcOpenshellFile, product: IfcOpenshellInstance, representation: IfcOpenshellInstance): IfcOpenshellInstance;
    /**
     * Clip a solid with an infinite half-space plane (IfcBooleanClippingResult).
     *
     * Creates a DIFFERENCE boolean between the item and an IfcHalfSpaceSolid.
     * If an owning element is provided, the clipping is registered in its
     * BBIM_Boolean property set.
     *
     * @param file IFC file that receives the clipping.
     * @param options Solid, plane point, normal, and optional element/history.
     * @return IfcBooleanClippingResult entity, or no result if creation fails.
     */
    clipSolid(file: IfcOpenshellFile, options: IfcOpenshellGeometryClipSolidOptions): IfcOpenshellInstance;
    /**
     * Clip a solid with a polygonal-bounded half-space (IfcPolygonalBoundedHalfSpace).
     *
     * Creates a DIFFERENCE boolean between the item and an
     * IfcPolygonalBoundedHalfSpace. Locations are in model units.
     *
     * @param file IFC file that receives the clipping.
     * @param options Solid, plane, boundary polygon, and optional element/history.
     * @return IfcBooleanClippingResult entity, or no result if creation fails.
     */
    clipSolidBounded(file: IfcOpenshellFile, options: IfcOpenshellGeometryClipSolidBoundedOptions): IfcOpenshellInstance;
    /**
     * Compute wall-mounted handrail geometry without an IFC file or context.
     *
     * The input and output coordinates and dimensions use project units. Fixed
     * metric design constants are divided by the supplied unit scale. Manual mode
     * permits a non-positive unused support-spacing value; automatic mode requires
     * positive spacing. Degenerate edges retain finite sharp vertices and do not
     * produce support or fillet geometry with undefined directions.
     *
     * @param options Required dimensions and path plus optional terminal/support policy.
     * @return Pure handrail and nested support geometry owned by the caller.
     */
    computeWallMountedHandrailGeometry(options: IfcOpenshellGeometryComputeWallMountedHandrailOptions): IfcOpenshellGeometryWallMountedHandrailResult;
    /**
     * Create an IfcRelConnectsElements between two elements.
     *
     * Removes any existing incompatible element connections between the two
     * elements before creating the new relationship.
     *
     * @param file IFC file that receives the relationship.
     * @param options Relating element, related element, and optional description/history.
     * @return IfcRelConnectsElements entity, or no result if creation fails.
     */
    connectElement(file: IfcOpenshellFile, options: IfcOpenshellGeometryConnectElementOptions): IfcOpenshellInstance;
    /**
     * Create an IfcRelConnectsPathElements between two path-based elements.
     *
     * Removes incompatible existing path connections (same terminal end or same
     * pair) before creating the new relationship. Connection types are "ATSTART",
     * "ATEND", or "ATPATH".
     *
     * @param file IFC file that receives the relationship.
     * @param options Elements, connection types, and optional description/geometry/history.
     * @return IfcRelConnectsPathElements entity, or no result if creation fails.
     */
    connectPath(file: IfcOpenshellFile, options: IfcOpenshellGeometryConnectPathOptions): IfcOpenshellInstance;
    /**
     * Connect two walls at their nearest endpoint.
     *
     * Computes the intersection of the second wall's axis with the first wall's
     * axis to determine ATSTART or ATEND. When is_atpath is true, the connection
     * type is ATPATH. Creates an IfcRelConnectsPathElements.
     *
     * @param file IFC file that receives the connection.
     * @param options Walls, connection mode, and optional owner history.
     * @return IfcRelConnectsPathElements entity, or no result if creation fails.
     */
    connectWall(file: IfcOpenshellFile, options: IfcOpenshellGeometryConnectWallOptions): IfcOpenshellInstance;
    /**
     * Copy a representation from one product to another.
     *
     * Copies the "Body" (or specified context) representation from the source
     * product, replaces any existing representation of the same context on the
     * target, and assigns the copy.
     *
     * @param file IFC file to modify.
     * @param options Source product, target product, and optional context identifier.
     * @return Newly created IfcShapeRepresentation, or no value when the source
     * has no representation for the requested context identifier.
     */
    copyRepresentation(file: IfcOpenshellFile, options: IfcOpenshellGeometryCopyRepresentationOptions): IfcOpenshellInstance | null;
    /**
     * Create a wall from two XY endpoints with body representation and placement.
     *
     * Computes the wall length from the endpoint distance, creates a wall
     * representation, and sets the object placement with rotation to align the
     * wall along the baseline.
     *
     * @param file IFC file that receives the wall geometry.
     * @param options Element, context, endpoints, elevation, height, thickness, and unit flag.
     * @return IfcShapeRepresentation entity, or no result if creation fails.
     */
    create2ptWall(file: IfcOpenshellFile, options: IfcOpenshellGeometryCreate2PtWallOptions): IfcOpenshellInstance;
    /**
     * Remove all IfcRelConnectsElements relationships between two elements.
     *
     * Searches both ConnectedTo and ConnectedFrom inverse references on both
     * elements and removes matching relationships.
     *
     * @param file IFC file to modify.
     * @param relating_element First element.
     * @param related_element Second element.
     */
    disconnectElement(file: IfcOpenshellFile, relating_element: IfcOpenshellInstance, related_element: IfcOpenshellInstance): void;
    /**
     * Remove path-based element connections.
     *
     * When element and connection_type are provided, removes all path connections
     * matching that type on the element. When relating_element and
     * related_element are provided, removes the specific connection between them.
     *
     * @param file IFC file to modify.
     * @param options Element, connection type, or relating/related element pair.
     */
    disconnectPath(file: IfcOpenshellFile, options: IfcOpenshellGeometryDisconnectPathOptions): void;
    /**
     * Set the ObjectPlacement of a product from a 4x4 transformation matrix.
     *
     * Creates a new IfcLocalPlacement relative to the product's parent
     * (determined from aggregation, nesting, containment, or void relationships).
     * The old placement is removed if unreferenced. When
     * should_transform_children is false, child placements are re-applied in their
     * previous world-space positions.
     *
     * @param file IFC file to modify.
     * @param options Product, matrix, SI flag, and child transform flag.
     * @return Newly created IfcLocalPlacement, or no result if creation fails.
     */
    editObjectPlacement(file: IfcOpenshellFile, options: IfcOpenshellGeometryEditObjectPlacementOptions): IfcOpenshellInstance;
    /**
     * Create a mapped representation (IfcRepresentationMap + IfcMappedItem).
     *
     * Wraps the given representation in an IfcRepresentationMap and returns a new
     * IfcShapeRepresentation of type "MappedRepresentation" containing one
     * IfcMappedItem.
     *
     * @param file IFC file that receives the mapped entities.
     * @param representation IfcShapeRepresentation to map.
     * @return New IfcShapeRepresentation with MappedRepresentation type.
     */
    mapRepresentation(file: IfcOpenshellFile, representation: IfcOpenshellInstance): IfcOpenshellInstance;
    /**
     * Return the axis-aligned 2D bounding box extents of a profile.
     *
     * Computes the X and Y extents from the profile's parameterized attributes
     * (e.g. OverallWidth/OverallDepth for I-shaped profiles). When those values
     * are unavailable, geometry evaluation is used when available. Returns an
     * empty list if the extents cannot be determined.
     *
     * @param file IFC file containing the profile.
     * @param profile IfcProfileDef entity.
     * @return Two-element list {x_extent, y_extent} in model units, or an empty list.
     */
    profileExtents(file: IfcOpenshellFile, profile: IfcOpenshellInstance): number[];
    /**
     * Regenerate a wall's body and axis representations from its material layers.
     *
     * Rebuilds the wall's body and axis representations using its material layers
     * and connected-wall geometry.
     *
     * @param file IFC file containing the wall.
     * @param options Wall entity, length, height, and optional angle.
     * @return New IfcShapeRepresentation for the body, or no result if regeneration fails.
     */
    regenerateWallRepresentation(file: IfcOpenshellFile, options: IfcOpenshellGeometryRegenerateWallRepresentationOptions): IfcOpenshellInstance;
    /**
     * Remove boolean operands from a solid representation.
     *
     * Removes boolean operations involving the given item, restores the primary
     * operand in its parent references, and exposes the other operands in the
     * owning representation.
     *
     * @param file IFC file to modify.
     * @param item Solid operand whose boolean chain to remove.
     */
    removeBoolean(file: IfcOpenshellFile, item: IfcOpenshellInstance): void;
    /**
     * Remove a representation and its unreferenced sub-entities.
     *
     * Cleans up styled items, presentation layer assignments, textures, and
     * colours. Geometric representation contexts are never deleted. Named
     * profiles are preserved when should_keep_named_profiles is true.
     *
     * @param file IFC file to modify.
     * @param representation IfcShapeRepresentation to remove.
     * @param options Whether to preserve named profiles.
     */
    removeRepresentation(file: IfcOpenshellFile, representation: IfcOpenshellInstance, options: IfcOpenshellGeometryRemoveRepresentationOptions): void;
    /**
     * Unassign a representation from a product or type product.
     *
     * For IfcProduct, removes the representation from the
     * IfcProductDefinitionShape and removes an empty shape definition. For
     * IfcTypeProduct, removes the matching IfcRepresentationMap and unmaps
     * occurrences. Shape aspects referencing the representation are also removed.
     *
     * @param file IFC file to modify.
     * @param product IfcProduct or IfcTypeProduct entity.
     * @param representation IfcShapeRepresentation to unassign.
     */
    unassignRepresentation(file: IfcOpenshellFile, product: IfcOpenshellInstance, representation: IfcOpenshellInstance): void;
    /**
     * Validate and correct a representation's RepresentationType.
     *
     * When the representation contains multiple boolean operands, they are
     * consolidated into a single boolean chain via UNION. Returns true if the
     * final representation type is "CSG" or was successfully auto-detected.
     *
     * @param file IFC file containing the representation.
     * @param representation IfcShapeRepresentation to validate.
     * @param options Optional preferred operand for boolean consolidation.
     * @return True if the representation type is valid or was corrected.
     */
    validateType(file: IfcOpenshellFile, representation: IfcOpenshellInstance, options: IfcOpenshellGeometryValidateTypeOptions): boolean;
  }

  export interface IfcOpenshellGeoreferenceModule {
    /**
     * Add georeferencing entities to a model.
     *
     * Creates an IfcProjectedCRS and a coordinate operation (IfcMapConversion,
     * IfcMapConversionScaled, or IfcRigidOperation) linking the Model context
     * to the projected CRS. For IFC2X3, creates ePSet_MapConversion and
     * ePSet_ProjectedCRS property sets on the IfcProject instead. Does nothing
     * if georeferencing entities already exist.
     *
     * @param file File that receives the new entities.
     * @param options Coordinate operation class, CRS name, and ownership options.
     */
    addGeoreferencing(file: IfcOpenshellFile, options: IfcOpenshellGeoreferenceAddGeoreferencingOptions): void;
    /**
     * Edit map conversion and projected CRS attributes.
     *
     * For IFC4+, applies attribute changes from the property bags to the first
     * IfcCoordinateOperation and/or IfcProjectedCRS in the file. For IFC2X3,
     * applies changes to the ePSet_MapConversion and ePSet_ProjectedCRS property
     * sets on the IfcProject. Entities must already exist (call
     * georeference_add_georeferencing first if needed).
     *
     * @param file File containing the georeferencing entities.
     * @param options Property bags for coordinate operation and projected CRS.
     */
    editGeoreferencing(file: IfcOpenshellFile, options: IfcOpenshellGeoreferenceEditGeoreferencingOptions): void;
    /**
     * Set or remove the true north direction on all geometric representation contexts.
     *
     * When omitted, any existing TrueNorth reference is removed from every
     * IfcGeometricRepresentationContext. When provided, the first two values are
     * used as (X, Y) direction ratios; missing values default to 0.0. The
     * direction is not normalized.
     *
     * @param file File whose contexts to update.
     * @param options True north direction ratios, or omission to remove true north.
     */
    editTrueNorth(file: IfcOpenshellFile, options: IfcOpenshellGeoreferenceEditTrueNorthOptions): void;
    /**
     * Edit the world coordinate system (WCS) on all geometric representation contexts.
     *
     * Replaces the WorldCoordinateSystem placement on every
     * IfcGeometricRepresentationContext. The rotation parameter specifies the
     * X-axis rotation in degrees. When is_si is true (default), coordinates are
     * interpreted as SI metres and scaled to project length units. The old WCS
     * placement is deleted if unreferenced.
     *
     * @param file File whose contexts to update.
     * @param options WCS offset, rotation, and unit-system options.
     */
    editWcs(file: IfcOpenshellFile, options: IfcOpenshellGeoreferenceEditWcsOptions): void;
    /**
     * Remove all georeferencing entities from a model.
     *
     * For IFC4+, deletes all IfcProjectedCRS and IfcCoordinateOperation entities
     * (including orphaned MapUnit). For IFC2X3, removes the ePSet_MapConversion
     * and ePSet_ProjectedCRS property sets from the IfcProject.
     *
     * @param file File from which to remove georeferencing.
     */
    removeGeoreferencing(file: IfcOpenshellFile): void;
  }

  export interface IfcOpenshellGridModule {
    /**
     * Create or replace the AxisCurve of a grid axis as a 2D IfcPolyline.
     *
     * Points are given in world coordinates; when is_si is true they are divided
     * by the file's LENGTHUNIT scale. The points are transformed into the grid's
     * local coordinate system using the grid's ObjectPlacement. An existing
     * AxisCurve is removed after replacement.
     *
     * @param file IFC file that receives the polyline.
     * @param p1 First endpoint (at least three coordinates; X and Y are used).
     * @param p2 Second endpoint (at least three coordinates; X and Y are used).
     * @param grid_axis IfcGridAxis whose AxisCurve to set.
     * @param is_si True if p1/p2 are in SI metres; false if already in model units.
     */
    createAxisCurve(file: IfcOpenshellFile, p1: [number, number, number], p2: [number, number, number], grid_axis: IfcOpenshellInstance, is_si: boolean): void;
    /**
     * Create an IfcGridAxis and append it to the specified grid axis aggregate.
     *
     * @param file IFC file that receives the new axis.
     * @param grid IfcGrid entity owning the axis.
     * @param axis_tag Label for the axis (e.g. "A", "1").
     * @param same_sense True if the axis direction agrees with the curve direction.
     * @param uvw_axes Name of the grid aggregate to append to: "UAxes", "VAxes", or "WAxes".
     * @return Newly created IfcGridAxis, or no result if creation fails.
     */
    createGridAxis(file: IfcOpenshellFile, grid: IfcOpenshellInstance, axis_tag: string, same_sense: boolean, uvw_axes: string): IfcOpenshellInstance;
    /**
     * Remove an IfcGridAxis and its associated AxisCurve.
     *
     * The axis entity and its associated AxisCurve are removed from the file.
     *
     * @param file IFC file to modify.
     * @param axis IfcGridAxis entity to remove.
     */
    removeGridAxis(file: IfcOpenshellFile, axis: IfcOpenshellInstance): void;
  }

  export interface IfcOpenshellGroupModule {
    /** Create a new IfcGroup with generated GlobalId and OwnerHistory. */
    addGroup(file: IfcOpenshellFile, options: IfcOpenshellGroupAddGroupOptions): IfcOpenshellInstance;
    /**
     * Assign products to a group via IfcRelAssignsToGroup.
     *
     * If an existing relationship is present, new products are merged into it.
     * Products already in the group are skipped.
     */
    assignGroup(file: IfcOpenshellFile, options: IfcOpenshellGroupAssignGroupOptions): IfcOpenshellInstance;
    /** Edit an IfcGroup using the shared attribute property writer. */
    editGroup(file: IfcOpenshellFile, group: IfcOpenshellInstance, attributes: number): void;
    /**
     * Remove a group and its relationships.
     *
     * Removes associated IfcRelDefinesByProperties (property sets) and
     * IfcRelAssignsToGroup relationships, then deletes the group entity.
     */
    removeGroup(file: IfcOpenshellFile, group: IfcOpenshellInstance): void;
    /**
     * Remove products from an IfcRelAssignsToGroup relationship.
     *
     * If no products remain in the relationship after removal, the relationship
     * is deleted.
     */
    unassignGroup(file: IfcOpenshellFile, options: IfcOpenshellGroupUnassignGroupOptions): void;
    /**
     * Replace the product list of an existing IfcRelAssignsToGroup relationship.
     *
     * If no relationship exists, a new one is created. Child IfcGroup entities
     * from the existing relationship are preserved and merged with the new list.
     * Multiple existing relationships are consolidated into one.
     */
    updateGroupProducts(file: IfcOpenshellFile, options: IfcOpenshellGroupUpdateGroupProductsOptions): IfcOpenshellInstance;
  }

  export interface IfcOpenshellGuidModule {
    compress(uuid_hex: string): string;
    expand(guid: string): string;
    generate(): string;
  }

  export interface IfcOpenshellLayerModule {
    /**
     * Create an IfcPresentationLayerAssignment with the given name.
     *
     * @param file IFC file that receives the layer.
     * @param name Layer name.
     * @return Newly created IfcPresentationLayerAssignment.
     */
    addLayer(file: IfcOpenshellFile, name: string): IfcOpenshellInstance;
    /**
     * Create an IfcPresentationLayerWithStyle with visibility flags and styles.
     *
     * @param file IFC file that receives the layer.
     * @param name Layer name.
     * @param options Visibility flags and styles.
     * @return Newly created IfcPresentationLayerWithStyle.
     */
    addLayerWithStyle(file: IfcOpenshellFile, name: string, options: IfcOpenshellLayerAddLayerWithStyleOptions): IfcOpenshellInstance;
    /**
     * Assign representation items to a presentation layer.
     *
     * Items already present in the layer's AssignedItems are not duplicated.
     *
     * @param file IFC file (unused, reserved for consistency).
     * @param items Representation items to assign.
     * @param layer IfcPresentationLayerAssignment or IfcPresentationLayerWithStyle.
     */
    assignLayer(file: IfcOpenshellFile, items: IfcOpenshellInstance[], layer: IfcOpenshellInstance): void;
    /** Edit a presentation layer using the shared attribute property writer. */
    editLayer(file: IfcOpenshellFile, layer: IfcOpenshellInstance, attributes: number): void;
    /**
     * Remove a presentation layer entity from the file.
     *
     * @param file IFC file to modify.
     * @param layer IfcPresentationLayerAssignment or IfcPresentationLayerWithStyle to remove.
     */
    removeLayer(file: IfcOpenshellFile, layer: IfcOpenshellInstance): void;
    /**
     * Remove representation items from a presentation layer.
     *
     * If all assigned items are removed, the layer entity itself is deleted from
     * the file. Does nothing silently when any specified item is not currently
     * assigned to the layer.
     *
     * @param file IFC file to modify.
     * @param items Representation items to unassign.
     * @param layer IfcPresentationLayerAssignment or IfcPresentationLayerWithStyle.
     */
    unassignLayer(file: IfcOpenshellFile, items: IfcOpenshellInstance[], layer: IfcOpenshellInstance): void;
  }

  export interface IfcOpenshellLibraryModule {
    /** Create a new IfcLibraryInformation with the given name. */
    addLibrary(file: IfcOpenshellFile, name: string): IfcOpenshellInstance;
    /**
     * Create a new IfcLibraryReference linked to a library.
     *
     * In IFC4+, the reference's ReferencedLibrary attribute is set. In IFC2X3,
     * the reference is appended to the library's LibraryReference aggregate.
     */
    addReference(file: IfcOpenshellFile, library: IfcOpenshellInstance): IfcOpenshellInstance;
    /**
     * Assign a library reference to products via IfcRelAssociatesLibrary.
     *
     * Products already associated with the reference are skipped. If an
     * existing relationship is present, new products are merged into it.
     */
    assignReference(file: IfcOpenshellFile, options: IfcOpenshellLibraryAssignReferenceOptions): IfcOpenshellInstance;
    /**
     * Edit an IfcLibraryInformation and apply VersionDate schema conversion.
     * Date-time property entries are stored as IFC4 strings or IFC2X3 dates.
     */
    editLibrary(file: IfcOpenshellFile, library: IfcOpenshellInstance, attributes: number): void;
    /** Edit an IfcLibraryReference using the shared attribute property writer. */
    editReference(file: IfcOpenshellFile, reference: IfcOpenshellInstance, attributes: number): void;
    /**
     * Set an IfcLibraryInformation VersionDate from an ISO-8601 date-time.
     *
     * IFC4 and later store the string directly. IFC2X3 creates and assigns an
     * IfcCalendarDate containing the date components.
     */
    editVersionDate(file: IfcOpenshellFile, library: IfcOpenshellInstance, iso_date_time: string): void;
    /**
     * Remove an IfcLibraryInformation and all its references.
     *
     * Deletes all child IfcLibraryReference entities, the library entity itself,
     * and all associated IfcRelAssociatesLibrary relationships.
     */
    removeLibrary(file: IfcOpenshellFile, library: IfcOpenshellInstance): void;
    /**
     * Remove an IfcLibraryReference and its association relationships.
     *
     * Deletes the reference entity and all IfcRelAssociatesLibrary relationships
     * that reference it.
     */
    removeReference(file: IfcOpenshellFile, reference: IfcOpenshellInstance): void;
    /**
     * Remove products from an IfcRelAssociatesLibrary relationship.
     *
     * If no products remain after removal, the relationship is deleted.
     */
    unassignReference(file: IfcOpenshellFile, options: IfcOpenshellLibraryUnassignReferenceOptions): void;
  }

  export interface IfcOpenshellMaterialModule {
    /** Add an IfcMaterialConstituent to an IfcMaterialConstituentSet. */
    addConstituent(file: IfcOpenshellFile, constituent_set: IfcOpenshellInstance, options: IfcOpenshellMaterialAddConstituentOptions): IfcOpenshellInstance;
    /**
     * Add an IfcMaterialLayer to an IfcMaterialLayerSet.
     *
     * The layer thickness is initialized to 0.1 metres, converted to the file's
     * project units (e.g. 100 for a millimetre project).
     */
    addLayer(file: IfcOpenshellFile, layer_set: IfcOpenshellInstance, options: IfcOpenshellMaterialAddLayerOptions): IfcOpenshellInstance;
    /** Append an IfcMaterial to an IfcMaterialList. */
    addListItem(file: IfcOpenshellFile, material_list: IfcOpenshellInstance, material: IfcOpenshellInstance): void;
    /** Create a new IfcMaterial. */
    addMaterial(file: IfcOpenshellFile, options: IfcOpenshellMaterialAddMaterialOptions): IfcOpenshellInstance;
    /**
     * Create a new material set of the requested type.
     *
     * Defaults to IfcMaterialConstituentSet if set_type is omitted.
     */
    addMaterialSet(file: IfcOpenshellFile, options: IfcOpenshellMaterialAddMaterialSetOptions): IfcOpenshellInstance;
    /** Add an IfcMaterialProfile to an IfcMaterialProfileSet. */
    addProfile(file: IfcOpenshellFile, profile_set: IfcOpenshellInstance, options: IfcOpenshellMaterialAddProfileOptions): IfcOpenshellInstance;
    /**
     * Assign a material to products via IfcRelAssociatesMaterial.
     *
     * Any existing material assignment on the products is removed first.
     * For "IfcMaterialLayerSetUsage" and "IfcMaterialProfileSetUsage", the
     * products are grouped by material set and direction; each group gets its
     * own usage entity and relationship. Returns the created relationship(s).
     */
    assignMaterial(file: IfcOpenshellFile, products: IfcOpenshellInstance[], options: IfcOpenshellMaterialAssignMaterialOptions): IfcOpenshellParseInstanceList;
    /**
     * Replace the profile on an IfcMaterialProfile and update representations.
     *
     * Sets the Profile attribute on the material profile. Updates the
     * SweptArea of any IfcSweptAreaSolid in representations of elements
     * using the parent IfcMaterialProfileSetUsage. The old profile is
     * deleted if it has no remaining references.
     */
    assignProfile(file: IfcOpenshellFile, material_profile: IfcOpenshellInstance, profile: IfcOpenshellInstance): void;
    /**
     * Copy a supported material definition without copying element assignments.
     *
     * Set members and material properties are copied recursively in order.
     * Underlying materials, profiles, representation contexts, and presentation
     * styles are reused.
     */
    copyMaterial(file: IfcOpenshellFile, material: IfcOpenshellInstance): IfcOpenshellInstance;
    /** Edit an IfcMaterial entity assigned to an element. */
    editAssignedMaterial(file: IfcOpenshellFile, element: IfcOpenshellInstance, attributes: number): void;
    /** Edit an IfcMaterialConstituent and replace its Material reference. */
    editConstituent(file: IfcOpenshellFile, constituent: IfcOpenshellInstance, attributes: number, material: IfcOpenshellInstance | null): void;
    /** Edit an IfcMaterialLayer and optionally replace its Material reference. */
    editLayer(file: IfcOpenshellFile, layer: IfcOpenshellInstance, attributes: number, material: IfcOpenshellInstance | null): void;
    /** Edit an IfcMaterialLayerSetUsage using the shared attribute property writer. */
    editLayerUsage(file: IfcOpenshellFile, usage: IfcOpenshellInstance, attributes: number): void;
    /** Edit an IfcMaterial using the shared attribute property writer. */
    editMaterial(file: IfcOpenshellFile, material: IfcOpenshellInstance, attributes: number): void;
    /** Edit an IfcMaterialProfile and optionally replace its profile or material. */
    editProfile(file: IfcOpenshellFile, profile: IfcOpenshellInstance, attributes: number, profile_def: IfcOpenshellInstance | null, material: IfcOpenshellInstance | null): void;
    /**
     * Edit attributes of an IfcMaterialProfileSetUsage.
     *
     * Applies attribute key-value pairs from the props builder. If CardinalPoint
     * changes and both profile_width and profile_height are provided, the
     * ObjectPlacement of associated elements is updated to reflect the new
     * cardinal point position.
     */
    editProfileUsage(file: IfcOpenshellFile, usage: IfcOpenshellInstance, options: IfcOpenshellMaterialEditProfileUsageOptions): void;
    /**
     * Remove an IfcMaterialConstituent from its set.
     *
     * If should_remove_material is true, the associated IfcMaterial is also
     * deleted.
     */
    removeConstituent(file: IfcOpenshellFile, constituent: IfcOpenshellInstance, options: IfcOpenshellMaterialRemoveItemOptions): void;
    /**
     * Remove an IfcMaterialLayer from its set.
     *
     * If should_remove_material is true, the associated IfcMaterial is also
     * deleted.
     */
    removeLayer(file: IfcOpenshellFile, layer: IfcOpenshellInstance, options: IfcOpenshellMaterialRemoveItemOptions): void;
    /** Remove an item from an IfcMaterialList by index. */
    removeListItem(file: IfcOpenshellFile, material_list: IfcOpenshellInstance, options: IfcOpenshellMaterialRemoveListItemOptions): void;
    /**
     * Remove an IfcMaterial and its associated constituents, layers, and profiles.
     *
     * Deletes the material entity. Constituent, layer, or profile entities
     * that reference it are also removed. Associated IfcRelAssociatesMaterial,
     * IfcMaterialProperties, and IfcMaterialDefinitionRepresentation entities
     * are cleaned up.
     */
    removeMaterial(file: IfcOpenshellFile, material: IfcOpenshellInstance): void;
    /**
     * Remove a material set and its items.
     *
     * Deletes all items (layers, profiles, constituents) in the set, then
     * removes the set entity. For IfcMaterialLayerSet and IfcMaterialProfileSet,
     * associated usage entities and their relationships are also deleted.
     * Associated IfcRelAssociatesMaterial and IfcMaterialProperties are
     * cleaned up.
     */
    removeMaterialSet(file: IfcOpenshellFile, material: IfcOpenshellInstance): void;
    /**
     * Remove an IfcMaterialProfile from its set.
     *
     * Optionally deletes the associated IfcMaterial and/or IfcProfileDef
     * if the corresponding flags are set.
     */
    removeProfile(file: IfcOpenshellFile, profile: IfcOpenshellInstance, options: IfcOpenshellMaterialRemoveProfileOptions): void;
    /**
     * Reorder an item within a material set.
     *
     * Moves the item from old_index to new_index within the set's aggregate
     * (MaterialConstituents, MaterialLayers, MaterialProfiles, or Materials).
     * Supports IfcMaterialConstituentSet, IfcMaterialLayerSet,
     * IfcMaterialProfileSet, and IfcMaterialList.
     */
    reorderSetItem(file: IfcOpenshellFile, material_set: IfcOpenshellInstance, options: IfcOpenshellMaterialReorderSetItemOptions): void;
    /**
     * Assign an ordered named constituent set and style matching shape aspects.
     *
     * An existing set is reused only when its complete name-to-material identity
     * mapping matches. New constituents preserve caller order. Unshared obsolete
     * sets are removed; shared sets
     * and bare materials are retained. If no representation exists in the exact
     * context, material assignment succeeds and style assignment is skipped.
     */
    setShapeAspectConstituents(file: IfcOpenshellFile, element: IfcOpenshellInstance, context: IfcOpenshellInstance, materials: IfcOpenshellMaterialConstituentEntryOptions[], options: IfcOpenshellMaterialSetShapeAspectConstituentsOptions): void;
    /**
     * Remove material assignments from products.
     *
     * Deletes IfcRelAssociatesMaterial relationships for the products. If the
     * material is an IfcMaterialLayerSetUsage or IfcMaterialProfileSetUsage
     * with no remaining products, the usage entity is also deleted.
     */
    unassignMaterial(file: IfcOpenshellFile, products: IfcOpenshellInstance[], options: IfcOpenshellMaterialUnassignMaterialOptions): void;
  }

  export interface IfcOpenshellNestModule {
    /**
     * Assign objects as nested children of a parent host via IfcRelNests.
     *
     * Objects previously nested under a different parent are moved. Objects
     * previously contained in a spatial structure or aggregated under a
     * different parent are removed from those relationships. If an existing
     * IfcRelNests relationship already relates to the same parent, objects
     * are merged into it while preserving insertion order.
     */
    assignObject(file: IfcOpenshellFile, options: IfcOpenshellNestAssignObjectOptions): IfcOpenshellInstance;
    /** Move an already nested child to a new parent, appending it after the target parent's current children. */
    changeNest(file: IfcOpenshellFile, options: IfcOpenshellNestChangeNestOptions): void;
    /** Reorder an existing nested child with Python-compatible index semantics; omitted old_index locates item. */
    reorderNesting(file: IfcOpenshellFile, options: IfcOpenshellNestReorderNestingOptions): void;
    /**
     * Remove objects from their IfcRelNests relationships.
     *
     * If no related objects remain after removal, the IfcRelNests
     * relationship itself is deleted.
     */
    unassignObject(file: IfcOpenshellFile, options: IfcOpenshellNestUnassignObjectOptions): void;
  }

  export interface IfcOpenshellOwnerModule {
    /**
     * Create an IfcActor (or subclass) entity.
     *
     * @param file File that receives the new entity.
     * @param options Actor identity and class options.
     * @return Newly created IfcActor or subclass.
     */
    addActor(file: IfcOpenshellFile, options: IfcOpenshellOwnerAddActorOptions): IfcOpenshellInstance;
    /**
     * Add an IfcAddress subclass to an IfcOrganization or IfcPerson.
     *
     * Creates an entity of the given IFC class (e.g. "IfcTelecomAddress",
     * "IfcPostalAddress") with Purpose set to OFFICE and appends it to the
     * assigned object's Addresses aggregate.
     *
     * @param file File that receives the new address.
     * @param assigned_object IfcOrganization or IfcPerson to receive the address.
     * @param ifc_class IFC class name of the address to create.
     * @return Newly created IfcAddress subclass.
     */
    addAddress(file: IfcOpenshellFile, assigned_object: IfcOpenshellInstance, ifc_class: string): IfcOpenshellInstance;
    /**
     * Create an IfcApplication entity.
     *
     * If application_developer is omitted, a default IfcOpenShell organisation
     * with a web-page address is created automatically.
     *
     * @param file File that receives the new entity.
     * @param options Application identity options.
     * @return Newly created IfcApplication.
     */
    addApplication(file: IfcOpenshellFile, options: IfcOpenshellOwnerAddApplicationOptions): IfcOpenshellInstance;
    /**
     * Create an IfcOrganization entity.
     *
     * Uses the Identification attribute on IFC4+ and Id on IFC2X3.
     *
     * @param file File that receives the new entity.
     * @param identification Organisation identifier.
     * @param name Organisation name.
     * @return Newly created IfcOrganization.
     */
    addOrganisation(file: IfcOpenshellFile, identification: string, name: string): IfcOpenshellInstance;
    /**
     * Create an IfcPerson entity.
     *
     * Uses the Identification attribute on IFC4+ and Id on IFC2X3.
     *
     * @param file File that receives the new entity.
     * @param identification Person identifier.
     * @param family_name Family (sur)name.
     * @param given_name Given (first) name.
     * @return Newly created IfcPerson.
     */
    addPerson(file: IfcOpenshellFile, identification: string, family_name: string, given_name: string): IfcOpenshellInstance;
    /**
     * Create an IfcPersonAndOrganization entity linking a person and an organisation.
     *
     * @param file File that receives the new entity.
     * @param person IfcPerson to link.
     * @param organisation IfcOrganization to link.
     * @return Newly created IfcPersonAndOrganization.
     */
    addPersonAndOrganisation(file: IfcOpenshellFile, person: IfcOpenshellInstance, organisation: IfcOpenshellInstance): IfcOpenshellInstance;
    /**
     * Add an IfcActorRole to an IfcOrganization, IfcPerson, or IfcPersonAndOrganization.
     *
     * If the role string matches a valid IFC enum value (e.g. "ARCHITECT"), it is
     * set directly. Otherwise, Role is set to USERDEFINED and UserDefinedRole
     * receives the string. The role is appended to the assigned object's Roles aggregate.
     *
     * @param file File that receives the new role.
     * @param assigned_object Entity to receive the role.
     * @param role Role name or user-defined string.
     * @return Newly created IfcActorRole.
     */
    addRole(file: IfcOpenshellFile, assigned_object: IfcOpenshellInstance, role: string): IfcOpenshellInstance;
    /**
     * Assign an actor to an object via IfcRelAssignsToActor.
     *
     * If an IfcRelAssignsToActor already exists for this actor and object, the
     * existing relationship is returned. If the actor already has a relationship,
     * the object is appended to its RelatedObjects. Otherwise a new relationship
     * is created.
     *
     * @param file File that receives the relationship.
     * @param options Actor, object, and ownership options.
     * @return The IfcRelAssignsToActor relationship.
     */
    assignActor(file: IfcOpenshellFile, options: IfcOpenshellOwnerAssignActorOptions): IfcOpenshellInstance;
    /**
     * Create a new IfcOwnerHistory.
     *
     * Sets CreationDate and LastModifiedDate to the current time, State to
     * READWRITE, and ChangeAction to ADDED. Both user and application are
     * required; if either is omitted, no owner history is created.
     *
     * @param file File that receives the new entity.
     * @param options User and application for the owner history.
     * @return Newly created IfcOwnerHistory, or no result if creation fails.
     */
    createOwnerHistory(file: IfcOpenshellFile, options: IfcOpenshellOwnerCreateOwnerHistoryOptions): IfcOpenshellInstance;
    /** Edit an IfcActor using the shared attribute property writer. */
    editActor(file: IfcOpenshellFile, actor: IfcOpenshellInstance, attributes: number): void;
    /** Edit an IfcAddress using the shared attribute property writer. */
    editAddress(file: IfcOpenshellFile, address: IfcOpenshellInstance, attributes: number): void;
    /** Edit an IfcApplication using the shared attribute property writer. */
    editApplication(file: IfcOpenshellFile, application: IfcOpenshellInstance, attributes: number): void;
    /** Edit an IfcOrganization using the shared attribute property writer. */
    editOrganisation(file: IfcOpenshellFile, organisation: IfcOpenshellInstance, attributes: number): void;
    /** Edit an IfcPerson using the shared attribute property writer. */
    editPerson(file: IfcOpenshellFile, person: IfcOpenshellInstance, attributes: number): void;
    /** Edit an IfcActorRole using the shared attribute property writer. */
    editRole(file: IfcOpenshellFile, role: IfcOpenshellInstance, attributes: number): void;
    /**
     * Remove an IfcActor (or subclass) from the file.
     *
     * Removes the entity and its owner history.
     *
     * @param file File containing the actor.
     * @param actor IfcActor entity to remove.
     */
    removeActor(file: IfcOpenshellFile, actor: IfcOpenshellInstance): void;
    /**
     * Remove an IfcAddress subclass from the file.
     *
     * If the address is the only entry in its parent's Addresses aggregate,
     * that aggregate is cleared before the entity is removed.
     *
     * @param file File containing the address.
     * @param address IfcAddress entity to remove.
     */
    removeAddress(file: IfcOpenshellFile, address: IfcOpenshellInstance): void;
    /**
     * Remove an IfcApplication from the file.
     *
     * @param file File containing the application.
     * @param application IfcApplication entity to remove.
     */
    removeApplication(file: IfcOpenshellFile, application: IfcOpenshellInstance): void;
    /**
     * Remove an IfcOrganization from the file.
     *
     * Cascades removal to roles, addresses, IfcPersonAndOrganization entities,
     * IfcActor entities, IfcOrganizationRelationship entities, and IfcApplication
     * entities that reference this organisation as their sole member.
     *
     * @param file File containing the organisation.
     * @param organisation IfcOrganization entity to remove.
     */
    removeOrganisation(file: IfcOpenshellFile, organisation: IfcOpenshellInstance): void;
    /**
     * Remove an IfcPerson from the file.
     *
     * Cascades removal to roles, addresses, IfcPersonAndOrganization entities,
     * IfcActor entities, and IfcResourceLevelRelationship entities that reference
     * this person as their sole member.
     *
     * @param file File containing the person.
     * @param person IfcPerson entity to remove.
     */
    removePerson(file: IfcOpenshellFile, person: IfcOpenshellInstance): void;
    /**
     * Remove an IfcPersonAndOrganization from the file.
     *
     * Cascades removal to IfcOwnerHistory, IfcActor, and
     * IfcResourceLevelRelationship entities that reference this entity as their
     * sole member.
     *
     * @param file File containing the person-and-organisation entity.
     * @param person_and_organisation IfcPersonAndOrganization entity to remove.
     */
    removePersonAndOrganisation(file: IfcOpenshellFile, person_and_organisation: IfcOpenshellInstance): void;
    /**
     * Remove an IfcActorRole from the file.
     *
     * If the role is the sole entry in its parent's Roles aggregate, that
     * aggregate is cleared before the entity is removed.
     *
     * @param file File containing the role.
     * @param role IfcActorRole entity to remove.
     */
    removeRole(file: IfcOpenshellFile, role: IfcOpenshellInstance): void;
    /**
     * Remove an object assignment from an actor via IfcRelAssignsToActor.
     *
     * If the relationship has only one RelatedObjects entry, the entire
     * relationship is removed. Otherwise the object is removed from the
     * RelatedObjects aggregate and the OwnerHistory is updated.
     *
     * @param file File containing the relationship.
     * @param options Actor and object to unassign.
     */
    unassignActor(file: IfcOpenshellFile, options: IfcOpenshellOwnerUnassignActorOptions): void;
    /**
     * Update or create the OwnerHistory on an IfcRoot element.
     *
     * If the element already has an IfcOwnerHistory, its LastModifiedDate,
     * LastModifyingUser, and LastModifyingApplication are updated. If not,
     * a new IfcOwnerHistory is created and assigned. Requires both user and
     * application to be provided.
     *
     * @param file File containing the element.
     * @param options Element, user, and application.
     * @return The updated or newly created IfcOwnerHistory, or no result if the element is not an IfcRoot.
     */
    updateOwnerHistory(file: IfcOpenshellFile, options: IfcOpenshellOwnerUpdateOwnerHistoryOptions): IfcOpenshellInstance;
  }

  export interface IfcOpenshellParseModule {
    argumentTypeToString(type: number): string;
    clearSchemas(): void;
    escapeXml(text: string): void;
    fromParameterType(parameter_type: IfcOpenshellParameterType): number;
    generalTokenPtr(start: number, token: string): number;
    getFeature(name: string): boolean;
    getInfoCpp(instance: IfcOpenshellInstance, include_identifier: boolean): string;
    getLog(): string;
    getPluginSearchPaths(): string[];
    getSiEquivalent(named_unit: IfcOpenshellInstance): number;
    guessFileType(path: string): number;
    instanceListCreateFromHandles(instances: IfcOpenshellInstance[]): IfcOpenshellParseInstanceList;
    makeAggregate(element_type: number): number;
    newFile(schema_identifier: string, file_type: number, path: string): IfcOpenshellFile | null;
    open(path: string, readonly: boolean): IfcOpenshellFile | null;
    openBypass(path: string, type_names: string[]): IfcOpenshellFile | null;
    operatorTokenPtr(start: number, data: string): number;
    readMemory(data: number, length: number): IfcOpenshellFile | null;
    registerSchema(schema: IfcOpenshellSchema): void;
    sanitateMaterialName(material_name: string): void;
    schemaByName(schema_name: string): IfcOpenshellSchema | null;
    schemaNames(): string[];
    schemaPluginRegistrationSymbol(): string;
    setFeature(name: string, value: boolean): void;
    setLogFormatJson(): void;
    setLogFormatText(): void;
    siPrefixToValue(prefix: string): number;
    stream(): IfcOpenshellInstanceStreamer | null;
    streamFromPath(path: string, mmap: boolean): IfcOpenshellInstanceStreamer | null;
    streamFromString(data: string): IfcOpenshellInstanceStreamer | null;
    traverse(instance: IfcOpenshellInstance, max_depth: number): IfcOpenshellParseInstanceList;
    traverseBreadthFirst(instance: IfcOpenshellInstance, max_depth: number): IfcOpenshellParseInstanceList;
    turnOffDetailedLogging(): void;
    turnOnDetailedLogging(): void;
    unescapeXml(text: string): void;
    validBinaryString(binary_string: string): boolean;
    version(): string;
    openBytes(bytes: Uint8Array | ArrayBuffer | ArrayBufferView, filename?: string, readonly?: boolean): IfcOpenshellFile | null;
  }

  export interface IfcOpenshellPlacementModule {
    /**
     * Extract a 4x4 row-major matrix from an IfcAxis2Placement entity.
     *
     * Supports IfcAxis2Placement2D, IfcAxis2Placement3D, and IfcAxis1Placement.
     * Returns an identity matrix if no instance is provided or the instance is unsupported.
     *
     * @param instance IfcAxis2Placement entity.
     * @return 16-element row-major 4x4 matrix.
     */
    getAxis2Placement(instance: IfcOpenshellInstance): [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
    /**
     * Extract a 4x4 row-major matrix from an IfcCartesianTransformationOperator3D.
     *
     * Handles uniform and non-uniform scaling. Returns an identity matrix if no
     * instance is provided or the instance is not a cartesian transformation operator.
     *
     * @param instance IfcCartesianTransformationOperator3D entity.
     * @return 16-element row-major 4x4 matrix.
     */
    getCartesianXform3d(instance: IfcOpenshellInstance): [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
    /**
     * Compute the cumulative 4x4 row-major world matrix of an IfcLocalPlacement.
     *
     * Combines the placement with its parent placements to compute the full
     * transformation. Returns an identity matrix when the placement is omitted.
     *
     * @param instance IfcLocalPlacement entity. When omitted, returns the identity matrix.
     * @return 16-element row-major 4x4 matrix.
     */
    getLocalPlacement(instance: IfcOpenshellInstance | null): [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
    /**
     * Compute the combined 4x4 row-major matrix for an IfcMappedItem.
     *
     * Multiplies the MappingTarget transformation by the MappingOrigin placement.
     * Returns an identity matrix if no instance is provided or the instance is
     * not an IfcMappedItem.
     *
     * @param instance IfcMappedItem entity.
     * @return 16-element row-major 4x4 matrix.
     */
    getMappeditemXform(instance: IfcOpenshellInstance): [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
    /**
     * Return the elevation of a building storey in model units.
     *
     * Uses the Z-translation of the storey's ObjectPlacement when available,
     * falling back to the Elevation attribute. Returns 0.0 if no instance is
     * provided or the instance has no placement.
     *
     * @param instance IfcBuildingStorey entity.
     * @return Elevation in model units.
     */
    getStoreyElevation(instance: IfcOpenshellInstance): number;
    /**
     * Compute a 4x4 row-major transformation matrix from origin and axes.
     *
     * @param origin XYZ origin of the placement.
     * @param z_axis Direction ratios for the Z axis.
     * @param x_axis Direction ratios for the X axis (Y is derived).
     * @return 16-element row-major 4x4 matrix.
     */
    matrixFromAxes(origin: [number, number, number], z_axis: [number, number, number], x_axis: [number, number, number]): [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
    /**
     * Build a 4x4 row-major rotation matrix about a principal axis.
     *
     * @param angle_rad Rotation angle in radians.
     * @param axis Rotation axis: "X", "Y", or "Z".
     * @return 16-element row-major 4x4 rotation matrix.
     */
    rotation(angle_rad: number, axis: PlacementRotationAxis): [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
  }

  export interface IfcOpenshellProfileModule {
    /**
     * Create an IfcArbitraryClosedProfileDef from an ordered polyline.
     *
     * Points are converted from SI metres to project units before creating the
     * outer curve. The curve representation is chosen automatically (IfcPolyline
     * for IFC2X3, IfcIndexedPolyCurve otherwise).
     *
     * @param file IFC file that receives the profile.
     * @param options Outer curve points and optional name.
     * @return Newly created IfcArbitraryClosedProfileDef.
     */
    addArbitraryProfile(file: IfcOpenshellFile, options: IfcOpenshellProfileAddArbitraryProfileOptions): IfcOpenshellInstance;
    /**
     * Create an IfcArbitraryProfileDefWithVoids from an outer curve and inner voids.
     *
     * Points are converted from SI metres to project units. The outer curve uses
     * IfcCartesianPointList3D for IFC4+ schemas and IfcPolyline for IFC2X3.
     *
     * @param file IFC file that receives the profile.
     * @param options Outer curve, inner void curves, and optional name.
     * @return Newly created IfcArbitraryProfileDefWithVoids.
     */
    addArbitraryProfileWithVoids(file: IfcOpenshellFile, options: IfcOpenshellProfileAddArbitraryProfileWithVoidsOptions): IfcOpenshellInstance;
    /**
     * Create a parameterized IFC profile definition.
     *
     * @param file IFC file that receives the profile.
     * @param ifc_class IFC entity class name (e.g. "IfcRectangleProfileDef").
     * @param profile_type Profile type string, typically "AREA".
     * @return Newly created IfcProfileDef entity.
     */
    addParameterizedProfile(file: IfcOpenshellFile, ifc_class: string, profile_type: string): IfcOpenshellInstance;
    /**
     * Copy a profile and its associated IfcProfileProperties.
     *
     * @param file IFC file that receives the copied profile.
     * @param profile IfcProfileDef entity to copy.
     * @return Newly created independent copy of the profile.
     */
    copyProfile(file: IfcOpenshellFile, profile: IfcOpenshellInstance): IfcOpenshellInstance;
    /**
     * Edit attributes of an existing profile definition.
     *
     * @param profile IfcProfileDef entity to modify.
     * @param attributes Attribute name-to-value mapping.
     */
    editProfile(profile: IfcOpenshellInstance, attributes: number): void;
    /**
     * Remove a profile definition and its directly referenced sub-entities.
     *
     * Removes associated IfcProfileProperties first, then removes the profile
     * entity and removes unreferenced entities belonging to its direct geometry,
     * such as curves and placements.
     *
     * @param file IFC file to modify.
     * @param profile IfcProfileDef entity to remove.
     */
    removeProfile(file: IfcOpenshellFile, profile: IfcOpenshellInstance): void;
  }

  export interface IfcOpenshellProjectModule {
    /**
     * Append one supported asset from a source/library file into the target file.
     *
     * Returns the existing or newly copied target asset, or an empty value for an
     * unsupported entity class. Native code owns graph traversal, inverse
     * filtering, deduplication, context replacement, placement correction, type
     * assignment, unit conversion, and reusable-cache cleanup.
     */
    appendAsset(file: IfcOpenshellFile, options: IfcOpenshellProjectAppendAssetOptions): IfcOpenshellInstance | null;
    /** Return valid cache mappings in ascending source-identity order. */
    appendAssetCacheEntries(cache: IfcOpenshellProjectAppendAssetCache): IfcOpenshellProjectAppendAssetCacheEntry;
    /** Allocate an empty reusable append-asset cache. */
    appendAssetCacheNew(): IfcOpenshellProjectAppendAssetCache | null;
    /** Seed/update one semantic source-entity mapping in an append-asset cache. */
    appendAssetCacheSet(cache: IfcOpenshellProjectAppendAssetCache, source: IfcOpenshellInstance, target: IfcOpenshellInstance): void;
    /**
     * Declare objects to a project or project library context.
     *
     * Creates or updates an IfcRelDeclares relationship linking the given
     * definitions to the relating context. If the definitions are already
     * declared to a different context, they are moved.
     */
    assignDeclaration(file: IfcOpenshellFile, options: IfcOpenshellProjectAssignDeclarationOptions): IfcOpenshellInstance;
    /**
     * Remove declarations of objects from a project or project library context.
     *
     * Removes the definitions from any existing IfcRelDeclares relationship.
     * If no definitions remain, the relationship itself is removed.
     */
    unassignDeclaration(file: IfcOpenshellFile, options: IfcOpenshellProjectUnassignDeclarationOptions): void;
  }

  export interface IfcOpenshellPsetModule {
    /**
     * Add or return an existing property set attached to an object, context, type,
     * material, or profile definition.
     *
     * For IfcObject/IfcContext, creates IfcRelDefinesByProperties. For
     * IfcTypeObject, appends to HasPropertySets. For IfcMaterial, creates
     * IfcMaterialProperties (or IfcExtendedMaterialProperties in IFC2X3).
     * For IfcProfileDef, creates IfcProfileProperties (or
     * IfcGeneralProfileProperties in IFC2X3). If a property set with the
     * same name already exists on the product, it is returned without
     * creating a new one.
     */
    addPset(file: IfcOpenshellFile, options: IfcOpenshellPsetAddPsetOptions): IfcOpenshellInstance;
    /**
     * Add or return an existing quantity set (IfcElementQuantity) on an object.
     *
     * If the name ends with "BaseQuantities", MethodOfMeasurement is set to
     * "BaseQuantities". If a quantity set with the same name already exists,
     * it is returned without creating a new one.
     */
    addQto(file: IfcOpenshellFile, options: IfcOpenshellPsetAddQtoOptions): IfcOpenshellInstance;
    /**
     * Assign a property set to products.
     *
     * For IfcTypeProduct instances, the pset is appended to HasPropertySets.
     * For other products, creates or updates an IfcRelDefinesByProperties
     * relationship.
     */
    assignPset(file: IfcOpenshellFile, options: IfcOpenshellPsetAssignPsetOptions): IfcOpenshellInstance;
    /**
     * Edit properties on an existing property set.
     *
     * Updates existing properties in-place (when not shared with other psets),
     * adds new properties for keys not yet present, and optionally removes
     * blank-valued properties. Uses the pset template for type inference when
     * available. Returns true on success, false on error.
     */
    editPset(file: IfcOpenshellFile, options: IfcOpenshellPsetEditPsetOptions): boolean;
    /**
     * Edit quantities on an existing quantity set.
     *
     * Updates existing quantities in-place, adds new quantities for keys not
     * yet present. Quantity types (Length, Area, Volume, Count, Weight, Time)
     * are inferred from the value type and name. Returns true on success,
     * false on error.
     */
    editQto(file: IfcOpenshellFile, options: IfcOpenshellPsetEditQtoOptions): boolean;
    /** Release a property builder allocated by pset_props_new. */
    propsFree(props: number): void;
    /** Allocate a new property builder. Release it with pset_props_free when done. */
    propsNew(): number | null;
    /** Set a boolean property value. */
    propsSetBool(props: number, key: string, value: boolean): void;
    /** Set a list-of-booleans property value. */
    propsSetBoolList(props: number, key: string, values: boolean[]): void;
    /** Set a date property value (IfcCalendarDate / IfcDate). */
    propsSetDate(props: number, key: string, year: number, month: number, day: number): void;
    /** Set a date-time property value (IfcLocalTime / IfcDateTime). */
    propsSetDatetime(props: number, key: string, year: number, month: number, day: number, hour: number, minute: number, second: number, microsecond: number, has_timezone: boolean, timezone_offset_minutes: number): void;
    /**
     * Set a nested mapping property. Ownership of the nested property data is
     * transferred to the outer data; do not release it separately. Used for
     * IfcPhysicalComplexQuantity in quantity sets.
     */
    propsSetDict(outer: number, key: string, inner: number): void;
    /** Set a double property value. */
    propsSetDouble(props: number, key: string, value: number): void;
    /** Set a list-of-doubles property value (creates IfcPropertyListValue). */
    propsSetDoubleList(props: number, key: string, values: number[]): void;
    /** Set a duration property value (IfcDuration). */
    propsSetDuration(props: number, key: string, negative: boolean, years: number, months: number, days: number, hours: number, minutes: number, seconds: number, microseconds: number): void;
    /**
     * Set a property to an existing IFC entity (for example, a typed value or
     * an IfcProperty). When omitted, the property is cleared.
     */
    propsSetInstance(props: number, key: string, value: IfcOpenshellInstance | null): void;
    /** Set a list-of-instances property value (creates IfcPropertyListValue). */
    propsSetInstanceList(props: number, key: string, values: IfcOpenshellInstance[]): void;
    /** Set an integer property value. */
    propsSetInt(props: number, key: string, value: bigint): void;
    /** Set a list-of-integers property value (creates IfcPropertyListValue). */
    propsSetIntList(props: number, key: string, values: bigint[]): void;
    /**
     * Set a property to a blank value. When editing, the property is removed if
     * should_purge is true; otherwise its NominalValue is set to blank.
     */
    propsSetNull(props: number, key: string): void;
    /** Set a string property value. The IFC type is inferred as IfcLabel. */
    propsSetString(props: number, key: string, value: string): void;
    /** Set a list-of-strings property value (creates IfcPropertyListValue). */
    propsSetStringList(props: number, key: string, values: string[]): void;
    /** Set a boolean property with an explicit IFC type (e.g. "IfcBoolean"). */
    propsSetTypedBool(props: number, key: string, value: boolean, ifc_type: string): void;
    /** Set a double property with an explicit IFC type (e.g. "IfcLengthMeasure"). */
    propsSetTypedDouble(props: number, key: string, value: number, ifc_type: string): void;
    /** Set an integer property with an explicit IFC type (e.g. "IfcInteger"). */
    propsSetTypedInt(props: number, key: string, value: bigint, ifc_type: string): void;
    /** Set a string property with an explicit IFC type (e.g. "IfcURIReference"). */
    propsSetTypedString(props: number, key: string, value: string, ifc_type: string): void;
    /**
     * Attach a unit to the most recently added property entry.
     *
     * Sets the Unit attribute on the resulting IfcPropertySingleValue. When
     * omitted, the unit is cleared.
     */
    propsSetUnitForLast(props: number, unit: IfcOpenshellInstance | null): void;
    /**
     * Remove a property set from a specific product.
     *
     * Removes the IfcRelDefinesByProperties relationship between the product
     * and pset. If the pset has no remaining associations, the pset and its
     * properties are deleted.
     */
    removePset(file: IfcOpenshellFile, product: IfcOpenshellInstance, pset: IfcOpenshellInstance): void;
    /**
     * Create a new IfcSimplePropertyTemplate and add it to a property set template.
     *
     * Property templates are kept sorted by name within the parent template.
     * If template_type is omitted, defaults to "P_SINGLEVALUE" for psets or
     * "Q_LENGTH" for qtos. If primary_measure_type is omitted, defaults to
     * "IfcLabel" for psets.
     */
    templateAddPropTemplate(file: IfcOpenshellFile, pset_template: IfcOpenshellInstance, name: string, description: string | null, template_type: string | null, primary_measure_type: string | null): IfcOpenshellInstance;
    /**
     * Create a new IfcPropertySetTemplate in the file.
     *
     * @param file The IFC file.
     * @param name Template name (e.g. "Pset_WallCommon").
     * @param template_type Template type string (e.g. "PSET_TYPEDRIVENOVERRIDE", "QTO").
     * @param applicable_entity Applicable IFC entity name (e.g. "IfcWall").
     */
    templateAddPsetTemplate(file: IfcOpenshellFile, name: string, template_type: string, applicable_entity: string): IfcOpenshellInstance;
    /**
     * Create a property template collection from custom IFC template files.
     *
     * Loads IfcPropertySetTemplate and IfcSimplePropertyTemplate entities from
     * the provided files. The returned collection remains valid until it is
     * released with pset_template_free.
     */
    templateCreateFromFiles(schema_identifier: string, template_files: IfcOpenshellFile[]): IfcOpenshellPsetTemplateHandle | null;
    /**
     * Edit a simple property template and its property enumeration.
     *
     * A populated Enumerators sequence is converted to wrapped IFC values using
     * the incoming PrimaryMeasureType, the existing type, or IfcLabel. Existing
     * IfcPropertyEnumeration entities are reused. An omitted, blank, or empty
     * Enumerators value leaves the current enumeration unchanged.
     */
    templateEditPropTemplate(file: IfcOpenshellFile, options: IfcOpenshellPsetTemplateEditPropTemplateOptions): void;
    /** Edit an IfcPropertySetTemplate using the shared attribute property writer. */
    templateEditPsetTemplate(file: IfcOpenshellFile, pset_template: IfcOpenshellInstance, attributes: number): void;
    /**
     * Return property set templates applicable to an IFC class and predefined type.
     *
     * Filters by pset_only (PSET templates) or qto_only (QTO templates).
     * If neither flag is set, returns both types. When predefined_type or
     * schema_name is omitted, the default is used.
     */
    templateGetApplicable(pqt: IfcOpenshellPsetTemplateHandle, ifc_class: string | null, predefined_type: string | null, pset_only: boolean, qto_only: boolean, schema_name: string | null): IfcOpenshellParseInstanceList;
    /**
     * Return names of property set templates applicable to an IFC class.
     *
     * Same filtering as pset_template_get_applicable but returns only the
     * Name strings.
     */
    templateGetApplicableNames(pqt: IfcOpenshellPsetTemplateHandle, ifc_class: string | null, predefined_type: string | null, pset_only: boolean, qto_only: boolean, schema_name: string | null): string[];
    /**
     * Look up a property set template by name.
     *
     * Returns the IfcPropertySetTemplate entity with the given name, or a
     * no result if the template is not found.
     */
    templateGetByName(pqt: IfcOpenshellPsetTemplateHandle, name: string): IfcOpenshellInstance;
    /**
     * Return the cached property template collection for the given schema (e.g. "IFC4", "IFC2X3").
     *
     * Loads and caches the built-in templates on first call. Returns no result
     * if the schema is unknown or templates are not available.
     */
    templateGetTemplate(schema_identifier: string): IfcOpenshellPsetTemplateHandle | null;
    /** Return true if a property set template with the given name exists. */
    templateIsTemplated(pqt: IfcOpenshellPsetTemplateHandle, name: string): boolean;
    /**
     * Return the template type category for a property set template.
     *
     * Returns "PSET" for property set templates, "QTO" for quantity templates,
     * or an empty string if unknown.
     */
    templatePsetType(pset_template: IfcOpenshellInstance): string;
    /**
     * Remove a property template from its parent set template.
     *
     * Removes the IfcSimplePropertyTemplate from its parent and deletes the
     * template entity.
     */
    templateRemovePropTemplate(file: IfcOpenshellFile, prop_template: IfcOpenshellInstance): void;
    /**
     * Remove a property set template and its child property templates.
     *
     * Deletes the IfcPropertySetTemplate and all its child
     * IfcSimplePropertyTemplate entities.
     */
    templateRemovePsetTemplate(pset_template: IfcOpenshellInstance): void;
    /**
     * Set the directory used to locate built-in pset/qto template files.
     *
     * Must be called before pset_template_get_template to override the default
     * search path for IFC property set template files.
     */
    templateSetTemplateDir(dir: string): void;
    /**
     * Remove products from a property set's associations.
     *
     * For IfcTypeProduct instances, removes the pset from HasPropertySets.
     * For other products, removes them from IfcRelDefinesByProperties
     * relationships. Orphaned relationships are deleted. The pset itself is
     * not deleted.
     */
    unassignPset(file: IfcOpenshellFile, products: IfcOpenshellInstance[], pset: IfcOpenshellInstance): void;
    /**
     * Unshare a property set by creating independent copies for specified products.
     *
     * When all assigned products are selected, one product retains the original
     * and the other products receive copies. When only some products are
     * selected, each selected product receives a copy and the original remains
     * assigned to the unselected products. Returns the newly created copies.
     */
    unsharePset(file: IfcOpenshellFile, options: IfcOpenshellPsetUnsharePsetOptions): IfcOpenshellParseInstanceList;
  }

  export interface IfcOpenshellPsetTemplateModule {
    /**
     * Create a new IfcSimplePropertyTemplate and add it to a property set template.
     *
     * Property templates are kept sorted by name within the parent template.
     * If template_type is omitted, defaults to "P_SINGLEVALUE" for psets or
     * "Q_LENGTH" for qtos. If primary_measure_type is omitted, defaults to
     * "IfcLabel" for psets.
     */
    addPropTemplate(file: IfcOpenshellFile, pset_template: IfcOpenshellInstance, name: string, description: string | null, template_type: string | null, primary_measure_type: string | null): IfcOpenshellInstance;
    /**
     * Create a new IfcPropertySetTemplate in the file.
     *
     * @param file The IFC file.
     * @param name Template name (e.g. "Pset_WallCommon").
     * @param template_type Template type string (e.g. "PSET_TYPEDRIVENOVERRIDE", "QTO").
     * @param applicable_entity Applicable IFC entity name (e.g. "IfcWall").
     */
    addPsetTemplate(file: IfcOpenshellFile, name: string, template_type: string, applicable_entity: string): IfcOpenshellInstance;
    /**
     * Create a property template collection from custom IFC template files.
     *
     * Loads IfcPropertySetTemplate and IfcSimplePropertyTemplate entities from
     * the provided files. The returned collection remains valid until it is
     * released with pset_template_free.
     */
    createFromFiles(schema_identifier: string, template_files: IfcOpenshellFile[]): IfcOpenshellPsetTemplateHandle | null;
    /**
     * Edit a simple property template and its property enumeration.
     *
     * A populated Enumerators sequence is converted to wrapped IFC values using
     * the incoming PrimaryMeasureType, the existing type, or IfcLabel. Existing
     * IfcPropertyEnumeration entities are reused. An omitted, blank, or empty
     * Enumerators value leaves the current enumeration unchanged.
     */
    editPropTemplate(file: IfcOpenshellFile, options: IfcOpenshellPsetTemplateEditPropTemplateOptions): void;
    /** Edit an IfcPropertySetTemplate using the shared attribute property writer. */
    editPsetTemplate(file: IfcOpenshellFile, pset_template: IfcOpenshellInstance, attributes: number): void;
    /**
     * Return property set templates applicable to an IFC class and predefined type.
     *
     * Filters by pset_only (PSET templates) or qto_only (QTO templates).
     * If neither flag is set, returns both types. When predefined_type or
     * schema_name is omitted, the default is used.
     */
    getApplicable(pqt: IfcOpenshellPsetTemplateHandle, ifc_class: string | null, predefined_type: string | null, pset_only: boolean, qto_only: boolean, schema_name: string | null): IfcOpenshellParseInstanceList;
    /**
     * Return names of property set templates applicable to an IFC class.
     *
     * Same filtering as pset_template_get_applicable but returns only the
     * Name strings.
     */
    getApplicableNames(pqt: IfcOpenshellPsetTemplateHandle, ifc_class: string | null, predefined_type: string | null, pset_only: boolean, qto_only: boolean, schema_name: string | null): string[];
    /**
     * Look up a property set template by name.
     *
     * Returns the IfcPropertySetTemplate entity with the given name, or a
     * no result if the template is not found.
     */
    getByName(pqt: IfcOpenshellPsetTemplateHandle, name: string): IfcOpenshellInstance;
    /**
     * Return the cached property template collection for the given schema (e.g. "IFC4", "IFC2X3").
     *
     * Loads and caches the built-in templates on first call. Returns no result
     * if the schema is unknown or templates are not available.
     */
    getTemplate(schema_identifier: string): IfcOpenshellPsetTemplateHandle | null;
    /** Return true if a property set template with the given name exists. */
    isTemplated(pqt: IfcOpenshellPsetTemplateHandle, name: string): boolean;
    /**
     * Return the template type category for a property set template.
     *
     * Returns "PSET" for property set templates, "QTO" for quantity templates,
     * or an empty string if unknown.
     */
    psetType(pset_template: IfcOpenshellInstance): string;
    /**
     * Remove a property template from its parent set template.
     *
     * Removes the IfcSimplePropertyTemplate from its parent and deletes the
     * template entity.
     */
    removePropTemplate(file: IfcOpenshellFile, prop_template: IfcOpenshellInstance): void;
    /**
     * Remove a property set template and its child property templates.
     *
     * Deletes the IfcPropertySetTemplate and all its child
     * IfcSimplePropertyTemplate entities.
     */
    removePsetTemplate(pset_template: IfcOpenshellInstance): void;
    /**
     * Set the directory used to locate built-in pset/qto template files.
     *
     * Must be called before pset_template_get_template to override the default
     * search path for IFC property set template files.
     */
    setTemplateDir(dir: string): void;
  }

  export interface IfcOpenshellRegisterModule {
    /**
     * Register an IFC file for schema-aware derived-value evaluation.
     *
     * The registered file is used when evaluating derived attributes for the
     * specified schema.
     *
     * @param schema_name The IFC schema identifier (e.g. "IFC4").
     * @param file The IFC file to register.
     * @return True after the file is registered.
     */
    scratchFile(schema_name: string | null, file: IfcOpenshellFile): boolean;
  }

  export interface IfcOpenshellRepresentationModule {
    /**
     * Return a geometric representation context matching the given criteria.
     *
     * Searches for IfcGeometricRepresentationSubContext when subcontext or
     * target_view is provided, otherwise searches for
     * IfcGeometricRepresentationContext (excluding subcontexts).
     *
     * @param file The IFC file to search.
     * @param context_type Context type filter (e.g. "Model", "Plan").
     * @param subcontext Context identifier filter (e.g. "Body", "Axis").
     * @param target_view Target view filter (e.g. "MODEL_VIEW", "GRAPH_VIEW").
     * @return The first matching context, or no result if none is found.
     */
    getContext(file: IfcOpenshellFile, context_type: string | null, subcontext: string | null, target_view: string | null): IfcOpenshellInstance;
    /**
     * Return all geometric representation contexts sorted by priority.
     *
     * Sorts by ContextType (Model > Plan > Annotation), then by
     * ContextIdentifier (Body > Body-FallBack > ...), then by
     * TargetView (MODEL_VIEW > PLAN_VIEW > ...), then by TargetScale. Ties
     * preserve the order of contexts in the IFC file.
     *
     * @param file The IFC file to search.
     * @return Ordered list of IfcGeometricRepresentationContext entities.
     */
    getPrioritisedContexts(file: IfcOpenshellFile): IfcOpenshellParseInstanceList;
    /**
     * Return a product's representation filtered by context.
     *
     * For an IfcProduct, reads Representation/Representations. For an
     * IfcTypeProduct, reads RepresentationMaps/MappedRepresentation.
     * Returns the first representation matching the context filters.
     *
     * @param element The IfcProduct or IfcTypeProduct.
     * @param options Context filtering options.
     * @return The matching IfcShapeRepresentation, or no result if none is found.
     */
    getProductRepresentation(element: IfcOpenshellInstance, options: IfcOpenshellRepresentationGetProductRepresentationOptions): IfcOpenshellInstance;
    /**
     * Resolve a representation through single mapped items.
     *
     * If a representation contains a single IfcMappedItem whose
     * MappingSource points to another representation, this function
     * follows the chain and returns the innermost representation. A representation
     * that does not meet this condition is returned unchanged.
     *
     * @param representation The IfcShapeRepresentation to resolve.
     * @return The resolved representation, or the original when no mapping is followed.
     */
    resolve(representation: IfcOpenshellInstance): IfcOpenshellInstance;
    /**
     * Return the base items of a representation, unwrapping mapped items and boolean operands.
     *
     * Returns leaf-level representation items in traversal order. Within each
     * representation, later items are returned before earlier items; for boolean
     * results, the second operand is returned before the first operand.
     *
     * @param representation The IfcShapeRepresentation to resolve.
     * @return List of leaf-level IfcRepresentationItem entities.
     */
    resolveBaseItems(representation: IfcOpenshellInstance): IfcOpenshellParseInstanceList;
  }

  export interface IfcOpenshellResourceModule {
    /** Create a construction resource, nesting it below a parent when supplied or declaring it to the first IFC4+ context. */
    addResource(file: IfcOpenshellFile, options: IfcOpenshellResourceAddResourceOptions): IfcOpenshellInstance;
    /**
     * Create and attach a schema-valid base quantity.
     *
     * Validation precedes replacement of any existing quantity. Matching upstream
     * behavior, resource/quantity support is checked before schema resolution.
     * Unsupported combinations and schema-resolution failures are value errors
     * with distinct stable codes; diagnostic messages must not be parsed.
     */
    addResourceQuantity(file: IfcOpenshellFile, resource: IfcOpenshellInstance, ifc_class?: string | null): IfcOpenshellInstance;
    /** Create an IfcResourceTime and replace the resource Usage reference. */
    addResourceTime(file: IfcOpenshellFile, resource: IfcOpenshellInstance): IfcOpenshellInstance;
    /** Assign one product or actor to a resource, reusing its ordered relationship and suppressing duplicates. */
    assignResource(file: IfcOpenshellFile, options: IfcOpenshellResourceAssignmentOptions): IfcOpenshellInstance;
    /** Calculate ScheduleUsage from ScheduleWork and the first applicable task duration. */
    calculateResourceUsage(file: IfcOpenshellFile, resource: IfcOpenshellInstance): void;
    /** Calculate ScheduleWork from EPset_Productivity and the first applicable task/product assignments. */
    calculateResourceWork(file: IfcOpenshellFile, resource: IfcOpenshellInstance): void;
    /** Edit an IfcResource using the shared attribute property writer. */
    editResource(file: IfcOpenshellFile, resource: IfcOpenshellInstance, attributes: number): void;
    /** Edit an IfcPhysicalQuantity using the shared attribute property writer. */
    editResourceQuantity(file: IfcOpenshellFile, physical_quantity: IfcOpenshellInstance, attributes: number): void;
    /**
     * Edit attributes of an IfcResourceTime entity.
     *
     * Applies attribute changes from the property bag to the resource time.
     * Attributes that are hard-constrained (ConstraintGrade HARD and Benchmark
     * EQUALTO) on the owning IfcResource are skipped. If ScheduleUsage is
     * changed and a ScheduleWork constraint exists, the associated IfcTask
     * duration is recalculated. Duration values use ISO 8601 format
     * (e.g. "PT8H", "P5D"). Date-time values use ISO 8601 extended format
     * (e.g. "2024-01-15T09:00:00").
     *
     * @param file File containing the resource time.
     * @param resource_time IfcResourceTime entity to edit.
     * @param attributes Property bag of attribute name/value pairs.
     */
    editResourceTime(file: IfcOpenshellFile, resource_time: IfcOpenshellInstance, attributes: number): void;
    /** Recursively remove a resource and clean its nesting, declaration, control, resource assignments, usage, quantity, and orphan history. */
    removeResource(file: IfcOpenshellFile, options: IfcOpenshellResourceRemoveResourceOptions): void;
    /** Detach and deep-remove the current base quantity, or do nothing when absent. */
    removeResourceQuantity(file: IfcOpenshellFile, resource: IfcOpenshellInstance): void;
    /** Remove exactly one resource/object assignment pair, preserving other ordered members. */
    unassignResource(file: IfcOpenshellFile, options: IfcOpenshellResourceAssignmentOptions): void;
  }

  export interface IfcOpenshellRootModule {
    /**
     * Copy a product with a fresh GlobalId and independent authoring data.
     *
     * Property sets, quantities, placements, nested ports, unfilled openings,
     * material usages, and material sets are copied according to their ownership
     * semantics. Ordinary product representations and type representation maps
     * are omitted. Shared aggregate, containment, type, group, and other
     * applicable inverse relationships retain the copy without duplicating
     * relationship members.
     */
    copyClass(file: IfcOpenshellFile, product: IfcOpenshellInstance): IfcOpenshellInstance;
    /**
     * Create an IFC entity with generated identity, optional name, and optional
     * predefined type.
     *
     * Sets GlobalId (for IfcRoot-derived entities). OwnerHistory is assigned only
     * when the owner_history option is provided; it is not created
     * automatically. Schema-specific defaults are applied for spatial elements,
     * element types, and door/window styles. If the predefined type is not a valid
     * enum value, it is stored as USERDEFINED with the value in ObjectType
     * (or ElementType/ProcessType where applicable).
     */
    createEntity(file: IfcOpenshellFile, options: IfcOpenshellRootCreateEntityOptions): IfcOpenshellInstance;
    /**
     * Change a product's class while preserving compatible data and relationships.
     *
     * Related types, sibling occurrences, property sets, representations, and
     * placements are migrated when switching between occurrence and type classes.
     * The replaced entity keeps its STEP id and the old entity handle becomes
     * invalid. Invalid classes or incompatible occurrence/type mappings fail.
     */
    reassignClass(file: IfcOpenshellFile, options: IfcOpenshellRootReassignClassOptions): IfcOpenshellInstance;
    /**
     * Remove a product and all its relationships.
     *
     * Removes the product and cleans up its related representations, object placements,
     * opening elements, property sets, material assignments, type definitions,
     * space boundaries, nesting relationships, aggregate relationships, spatial
     * containment, element connections, port connections, group memberships,
     * and grid axes. Related entities are removed only when they are no longer
     * needed by the remaining model.
     */
    removeProduct(file: IfcOpenshellFile, product: IfcOpenshellInstance, options: IfcOpenshellRootRemoveProductOptions): void;
  }

  export interface IfcOpenshellSchemaModule {
    /**
     * Change the IFC class of an entity.
     *
     * Removes the element and recreates it as the new class with the same
     * STEP id. Compatible attributes are preserved; incompatible attributes
     * are dropped. Inverse references to the old element are updated to
     * point to the new element.
     *
     * If the element is already of the requested class, returns it unchanged.
     *
     * @param file IFC file to modify. When omitted, the element's file is used.
     * @param element The entity to reassign.
     * @param new_class The target IFC class name (e.g. "IfcWall").
     * @return The new entity of the requested class, or no result if the operation fails.
     */
    reassignClass(file: IfcOpenshellFile | null, element: IfcOpenshellInstance, new_class: string): IfcOpenshellInstance;
  }

  export interface IfcOpenshellSelectorModule {
    /**
     * Filter all elements in a file using a selector query.
     *
     * Parses the query as a filter expression and returns all matching
     * elements as a list value.
     *
     * Common selector forms are:
     * - `IfcWall` to match an IFC class.
     * - `Name*=roof` to match an attribute containing a value.
     * - `IfcSlab, PredefinedType=ROOF` to combine class and attribute facets.
     * - `IfcWall, Pset_WallCommon.FireRating=2HR` to match a property.
     *
     * Separate facets with commas and write comparisons directly, without square
     * brackets. Supported comparison operators include `=`, `!=`, `*=`, `!*=`,
     * `>`, `<`, `>=`, and `<=`. Values may be quoted; `/pattern/` denotes a
     * regular expression and `NULL` matches an unset value.
     *
     * @param file The IFC file to search.
     * @param query Selector expression using IFC classes, attributes, properties,
     * comparison operators, and comma-separated facets.
     * @return List value of matching elements, or no result if the query cannot be evaluated. Release it with value_free.
     */
    filterAll(file: IfcOpenshellFile, query: string): IfcOpenshellValue | null;
    /**
     * Filter a list of elements using a selector query.
     *
     * Parses the query as a filter expression and returns the subset
     * of elements that match. The query uses the same syntax as
     * selector_filter_all, such as `Name*=roof` or
     * `IfcSlab, PredefinedType=ROOF`; comparisons do not use square brackets.
     *
     * @param file The IFC file context.
     * @param query Selector expression using IFC classes, attributes, properties,
     * comparison operators, and comma-separated facets.
     * @param elements The elements to filter.
     * @return List value of matching elements, or no result if the query cannot be evaluated. Release it with value_free.
     */
    filterElements(file: IfcOpenshellFile, query: string, elements: IfcOpenshellInstance[]): IfcOpenshellValue | null;
    /**
     * Format a selector query against an element.
     *
     * Evaluates a format expression (e.g. attribute names, arithmetic,
     * string functions) against an element and returns the formatted string.
     *
     * @param file Optional IFC file context.
     * @param instance The element to format against.
     * @param query The format expression string.
     * @return The formatted result, or no result if evaluation fails.
     */
    format(file: IfcOpenshellFile | null, instance: IfcOpenshellInstance | null, query: string): string | null;
    /**
     * Get a value from an element using a selector query.
     *
     * Parses the query as a get-element key path and extracts the
     * corresponding value from the element's attributes.
     *
     * @param file Optional IFC file context.
     * @param element The element to query.
     * @param query The selector key path (e.g. "Name", "Pset_WallCommon.FireRating").
     * @return The extracted value, or no result if the query cannot be evaluated. Release it with value_free.
     */
    getElementValue(file: IfcOpenshellFile | null, element: IfcOpenshellInstance, query: string): IfcOpenshellValue | null;
    /**
     * Return the number of keys in a parsed key list.
     *
     * @param keys Parsed key list from selector_parse_keys.
     * @return Number of keys, or 0 when no key list is provided.
     */
    keysCount(keys: number | null): number;
    /**
     * Release a parsed key list.
     *
     * @param keys Parsed key list from selector_parse_keys.
     */
    keysFree(keys: number | null): void;
    /**
     * Return the text of a key at the given index.
     *
     * @param keys Parsed key list.
     * @param index Zero-based key index.
     * @return Key text, or an empty string if no key list is provided or the index is out of range.
     */
    keysGet(keys: number | null, index: number): string;
    /**
     * Check whether a key at the given index is a regular expression.
     *
     * @param keys Parsed key list.
     * @param index Zero-based key index.
     * @return True if the key is a regular expression pattern; otherwise false.
     */
    keysIsRegex(keys: number | null, index: number): boolean;
    /**
     * Return a child node at the given index.
     *
     * @param node The parent selector node.
     * @param index Zero-based child index.
     * @return The child node, or no result if no parent is provided or the index is out of range.
     */
    nodeChild(node: number | null, index: number): number | null;
    /**
     * Return the number of child nodes.
     *
     * @param node The selector node.
     * @return Number of children, or 0 when no node is provided.
     */
    nodeChildCount(node: number | null): number;
    /**
     * Release a selector syntax tree and all its descendants.
     *
     * @param root Root node from selector_parse_filter, selector_parse_get_element,
     * or selector_parse_format.
     */
    nodeFree(root: number | null): void;
    /**
     * Return the kind of a selector node.
     *
     * Values below 100 are grammar-rule nodes; values at or above 100 are token
     * nodes. When no node is provided, the anonymous-token kind is returned.
     *
     * @param node The selector node.
     * @return Node-kind value, or the anonymous-token kind when no node is provided.
     */
    nodeKind(node: number | null): number;
    /**
     * Return the text content of a token node.
     *
     * For token nodes (kind at or above 100), returns the matched text. For
     * grammar-rule nodes, returns an empty string.
     *
     * @param node The selector node.
     * @return Node text, or an empty string if no node is provided or the node is not a token.
     */
    nodeText(node: number | null): string;
    /**
     * Parse a filter query into a selector syntax tree.
     *
     * Parses a filter expression (e.g. "IfcWall, Pset_WallCommon.FireRating=*2h*")
     * into a tree of selector nodes.
     *
     * @param query The filter query string.
     * @return Root node of the syntax tree, or no result if the query is invalid.
     * Release the tree with selector_node_free.
     */
    parseFilter(query: string): number | null;
    /**
     * Parse a format query into a selector syntax tree.
     *
     * Parses a format expression (e.g. "Name + ' - ' + GlobalId") into
     * a tree of selector nodes.
     *
     * @param query The format query string.
     * @return Root node of the syntax tree, or no result if the query is invalid.
     * Release the tree with selector_node_free.
     */
    parseFormat(query: string): number | null;
    /**
     * Parse a get-element query into a selector syntax tree.
     *
     * Parses a key path expression (e.g. "IfcWall/Name") into a tree of
     * selector nodes.
     *
     * @param query The get-element query string.
     * @return Root node of the syntax tree, or no result if the query is invalid.
     * Release the tree with selector_node_free.
     */
    parseGetElement(query: string): number | null;
    /**
     * Parse a selector query into a list of key entries.
     *
     * Extracts the key path from a get-element query (e.g.
     * "IfcWall/Name" yields keys ["IfcWall", "Name"]).
     *
     * @param query The selector query string.
     * @return Parsed key list, or no result if the query is invalid. Release it
     * with selector_keys_free.
     */
    parseKeys(query: string): number | null;
    /**
     * Set a value on an element using a selector query.
     *
     * Parses the query to identify the target attribute (e.g. a property
     * set property or direct attribute) and sets it to the provided value.
     *
     * @param file The IFC file context.
     * @param element The element to modify.
     * @param query The selector key path identifying the target.
     * @param value The value to set. When omitted, the target is unset.
     * @param concat When provided and non-empty, it is prepended to the value.
     */
    setElementValue(file: IfcOpenshellFile, element: IfcOpenshellInstance | null, query: string, value: IfcOpenshellValue | null, concat: string | null): void;
  }

  export interface IfcOpenshellSequenceModule {
    /**
     * Parse an ISO 8601 date-time string and return a schema-appropriate representation.
     *
     * For IFC4+, returns the string as-is. For IFC2X3, returns an IfcDateAndTime
     * entity constructed from the parsed components.
     *
     * @param file File to determine the schema version.
     * @param date_time ISO 8601 date-time string (e.g. "2024-01-15T09:00:00").
     * @return An IfcDateAndTime entity (IFC2X3) or the original string (IFC4+).
     */
    addDateTime(file: IfcOpenshellFile, date_time: string): IfcOpenshellInstance | string;
    /**
     * Create an IfcTask entity.
     *
     * When both work_schedule and parent_task are provided, work_schedule takes
     * precedence and the task is assigned to it via IfcRelAssignsToControl.
     * When only parent_task is provided, the task is nested under it via
     * IfcRelNests and its Identification is auto-generated as "parent.N" on IFC4+.
     *
     * @param file File that receives the new entity.
     * @param options Task placement and attribute options.
     * @return Newly created IfcTask.
     */
    addTask(file: IfcOpenshellFile, options: IfcOpenshellSequenceAddTaskOptions): IfcOpenshellInstance;
    /**
     * Create an IfcTaskTime (or IfcTaskTimeRecurring) and assign it to a task.
     *
     * Replaces any existing TaskTime on the task.
     *
     * @param file File that receives the new entity.
     * @param task IfcTask to receive the task time.
     * @param options Whether to create a recurring task time.
     * @return Newly created IfcTaskTime or IfcTaskTimeRecurring.
     */
    addTaskTime(file: IfcOpenshellFile, task: IfcOpenshellInstance, options: IfcOpenshellSequenceAddTaskTimeOptions): IfcOpenshellInstance;
    /**
     * Create an IfcTimePeriod and add it to a recurrence pattern.
     *
     * @param file File that receives the new entity.
     * @param recurrence_pattern IfcRecurrencePattern to receive the time period.
     * @param options Start and end time strings.
     * @return Newly created IfcTimePeriod.
     */
    addTimePeriod(file: IfcOpenshellFile, recurrence_pattern: IfcOpenshellInstance, options: IfcOpenshellSequenceAddTimePeriodOptions): IfcOpenshellInstance;
    /**
     * Create an IfcWorkCalendar and declare it on the project.
     *
     * @param file File that receives the new entity.
     * @param options Calendar name, predefined type, and ownership options.
     * @return Newly created IfcWorkCalendar.
     */
    addWorkCalendar(file: IfcOpenshellFile, options: IfcOpenshellSequenceAddWorkCalendarOptions): IfcOpenshellInstance;
    /**
     * Create an IfcWorkPlan and declare it on the project.
     *
     * @param file File that receives the new entity.
     * @param options Work plan name, dates, creator, and ownership options.
     * @return Newly created IfcWorkPlan.
     */
    addWorkPlan(file: IfcOpenshellFile, options: IfcOpenshellSequenceAddWorkPlanOptions): IfcOpenshellInstance;
    /**
     * Create an IfcWorkSchedule.
     *
     * When work_plan is provided, the schedule is nested under it via
     * IfcRelAggregates. Otherwise it is declared directly on the project
     * context (IFC4+).
     *
     * @param file File that receives the new entity.
     * @param options Schedule name, type, dates, work plan, and ownership options.
     * @return Newly created IfcWorkSchedule.
     */
    addWorkSchedule(file: IfcOpenshellFile, options: IfcOpenshellSequenceAddWorkScheduleOptions): IfcOpenshellInstance;
    /**
     * Create an IfcWorkTime and add it to a work calendar.
     *
     * @param file File that receives the new entity.
     * @param work_calendar IfcWorkCalendar to receive the work time.
     * @param time_type "WorkingTimes" or "ExceptionTimes".
     * @return Newly created IfcWorkTime.
     */
    addWorkTime(file: IfcOpenshellFile, work_calendar: IfcOpenshellInstance, time_type: string): IfcOpenshellInstance;
    /**
     * Create an IfcLagTime and assign it to an IfcRelSequence.
     *
     * Replaces any existing TimeLag on the sequence (removing the old one if
     * it is sole-referenced).
     *
     * @param file File that receives the new entity.
     * @param rel_sequence IfcRelSequence to receive the lag time.
     * @param lag_value ISO 8601 duration string (e.g. "P2D", "PT8H").
     * @param options Duration type option. Defaults to "WORKTIME".
     * @return Newly created IfcLagTime.
     */
    assignLagTime(file: IfcOpenshellFile, rel_sequence: IfcOpenshellInstance, lag_value: string, options: IfcOpenshellSequenceAssignLagTimeOptions): IfcOpenshellInstance;
    /**
     * Assign a process (IfcTask) to an object via IfcRelAssignsToProcess.
     *
     * If a relationship already exists for this process and object, it is
     * returned. Otherwise a new relationship is created or the object is
     * appended to an existing relationship.
     *
     * @param file File that receives the relationship.
     * @param relating_process IfcTask (process) to assign.
     * @param related_object Object to assign to the process.
     * @param options Ownership options.
     * @return The IfcRelAssignsToProcess relationship.
     */
    assignProcess(file: IfcOpenshellFile, relating_process: IfcOpenshellInstance, related_object: IfcOpenshellInstance, options: IfcOpenshellSequenceAssignProcessOptions): IfcOpenshellInstance;
    /**
     * Assign a product to an object via IfcRelAssignsToProduct.
     *
     * @param file File that receives the relationship.
     * @param relating_product IfcProduct to assign.
     * @param related_object Object to assign to the product.
     * @param options Ownership options.
     * @return The IfcRelAssignsToProduct relationship.
     */
    assignProduct(file: IfcOpenshellFile, relating_product: IfcOpenshellInstance, related_object: IfcOpenshellInstance, options: IfcOpenshellSequenceAssignProductOptions): IfcOpenshellInstance;
    /**
     * Create an IfcRecurrencePattern and assign it to a parent entity.
     *
     * Assigns the pattern to an IfcWorkTime's RecurrencePattern or an
     * IfcTaskTimeRecurring's Recurrence attribute. Replaces any existing
     * pattern on the parent (removing the old one if sole-referenced).
     *
     * @param file File that receives the new entity.
     * @param parent IfcWorkTime or IfcTaskTimeRecurring to receive the pattern.
     * @param recurrence_type RecurrenceType enum value (e.g. "WEEKLY").
     * @return Newly created IfcRecurrencePattern.
     */
    assignRecurrencePattern(file: IfcOpenshellFile, parent: IfcOpenshellInstance, recurrence_type: string): IfcOpenshellInstance;
    /**
     * Create an IfcRelSequence linking two tasks.
     *
     * If a sequence relationship already exists between the two tasks, the
     * existing relationship is returned. After creating the relationship,
     * cascades schedule changes from the relating (predecessor) task.
     *
     * @param file File that receives the relationship.
     * @param relating_process Predecessor IfcTask.
     * @param related_process Successor IfcTask.
     * @param options Sequence type and ownership options.
     * @return The IfcRelSequence relationship.
     * @throws A recursion error with the stable recursive-schedule-cascade code
     * when the relationship exposes a cycle during cascading.
     */
    assignSequence(file: IfcOpenshellFile, relating_process: IfcOpenshellInstance, related_process: IfcOpenshellInstance, options: IfcOpenshellSequenceAssignSequenceOptions): IfcOpenshellInstance;
    /**
     * Assign an IfcWorkSchedule to an IfcWorkPlan via IfcRelAggregates.
     *
     * First unassigns the schedule from its current project declaration, then
     * nests it under the work plan.
     *
     * @param file File containing both entities.
     * @param work_schedule IfcWorkSchedule to assign.
     * @param work_plan IfcWorkPlan to assign to.
     * @param options Ownership options.
     * @return The IfcRelAggregates relationship.
     */
    assignWorkPlan(file: IfcOpenshellFile, work_schedule: IfcOpenshellInstance, work_plan: IfcOpenshellInstance, options: IfcOpenshellSequenceAssignWorkPlanOptions): IfcOpenshellInstance;
    /**
     * Recalculate a task's ScheduleDuration from its assigned resources.
     *
     * Computes the maximum resource usage duration across all IfcConstructionResource
     * entities assigned to the task (directly or via IfcRelAssignsToProcess),
     * accounting for ScheduleWork and ScheduleUsage. The result is written to the
     * task's IfcTaskTime.ScheduleDuration. Creates an IfcTaskTime if absent.
     *
     * @param file File containing the task.
     * @param task IfcTask entity to recalculate.
     */
    calculateTaskDuration(file: IfcOpenshellFile, task: IfcOpenshellInstance): void;
    /**
     * Cascade schedule dates from a task to all its successors.
     *
     * Propagates ScheduleStart and ScheduleFinish dates forward through the
     * task network, respecting sequence types (FS, SS, FF, SF), lag times,
     * duration types, and work calendars.
     *
     * @param file File containing the task network.
     * @param task IfcTask from which to cascade.
     * @throws A recursion error with the stable recursive-schedule-cascade code.
     */
    cascadeSchedule(file: IfcOpenshellFile, task: IfcOpenshellInstance): void;
    /**
     * Create an independent copy of an IfcWorkSchedule and its controlled tasks.
     *
     * Copies the schedule and each controlled IfcTask, including its subtasks and
     * relationships, then assigns the copies to the new schedule.
     *
     * @param file File that receives the copied entities.
     * @param work_schedule IfcWorkSchedule to copy.
     * @param options Ownership options for the copied entities.
     * @return Newly created IfcWorkSchedule.
     */
    copyWorkSchedule(file: IfcOpenshellFile, work_schedule: IfcOpenshellInstance, options: IfcOpenshellSequenceCopyWorkScheduleOptions): IfcOpenshellInstance;
    /**
     * Create a baseline snapshot of an IfcWorkSchedule.
     *
     * Only operates on schedules with PredefinedType PLANNED. Creates a new
     * IfcWorkSchedule with PredefinedType BASELINE, deep-copies all controlled
     * tasks into it, and creates IfcRelDefinesByObject references linking
     * original tasks to their baseline copies.
     *
     * @param file File that receives the baseline entities.
     * @param work_schedule IfcWorkSchedule to baseline.
     * @param options Name override and ownership options.
     */
    createBaseline(file: IfcOpenshellFile, work_schedule: IfcOpenshellInstance, options: IfcOpenshellSequenceCreateBaselineOptions): void;
    /**
     * Create an independent copy of a task and its subtasks, property sets, and
     * sequence relationships.
     *
     * Creates copies of the task, its nested child tasks, property sets, and
     * IfcRelSequence relationships between copied tasks. Returns parallel lists
     * of original and copied tasks in depth-first order.
     *
     * @param file File that receives the duplicated entities.
     * @param task IfcTask to duplicate.
     * @param options Ownership options for duplicated entities.
     * @return Parallel lists of original and copied tasks.
     */
    duplicateTask(file: IfcOpenshellFile, task: IfcOpenshellInstance, options: IfcOpenshellSequenceDuplicateTaskOptions): IfcOpenshellSequenceDuplicateTaskResult;
    /**
     * Edit attributes of an IfcLagTime entity.
     *
     * Cascades schedule changes to each IfcRelSequence that references the lag.
     *
     * @param file File containing the lag and task network.
     * @param lag_time IfcLagTime entity to edit.
     * @param attributes Property bag of attribute name/value pairs.
     */
    editLagTime(file: IfcOpenshellFile, lag_time: IfcOpenshellInstance, attributes: number): void;
    /**
     * Edit attributes of an IfcRecurrencePattern entity.
     *
     * @param recurrence_pattern IfcRecurrencePattern entity to edit.
     * @param attributes Property bag of attribute name/value pairs.
     */
    editRecurrencePattern(recurrence_pattern: IfcOpenshellInstance, attributes: number): void;
    /**
     * Edit attributes of an IfcRelSequence entity.
     *
     * Cascades the related task when SequenceType is supplied.
     *
     * @param file File containing the relationship and task network.
     * @param rel_sequence IfcRelSequence entity to edit.
     * @param attributes Property bag of attribute name/value pairs.
     */
    editSequence(file: IfcOpenshellFile, rel_sequence: IfcOpenshellInstance, attributes: number): void;
    /**
     * Edit attributes of an IfcTask entity.
     *
     * @param task IfcTask entity to edit.
     * @param attributes Property bag of attribute name/value pairs.
     */
    editTask(task: IfcOpenshellInstance, attributes: number): void;
    /**
     * Edit attributes of an IfcTaskTime entity.
     *
     * Applies attribute changes from the property bag. Automatically derives
     * ScheduleFinish from ScheduleStart + ScheduleDuration, or ScheduleDuration
     * from ScheduleStart and ScheduleFinish, as appropriate. Dates are normalised
     * to the soonest working day based on the task's calendar. After editing,
     * cascades schedule changes to successor tasks.
     *
     * @param file File containing the task time.
     * @param task_time IfcTaskTime entity to edit.
     * @param attributes Property bag of attribute name/value pairs.
     */
    editTaskTime(file: IfcOpenshellFile, task_time: IfcOpenshellInstance, attributes: number): void;
    /**
     * Edit attributes of an IfcWorkCalendar entity.
     *
     * @param work_calendar IfcWorkCalendar entity to edit.
     * @param attributes Property bag of attribute name/value pairs.
     */
    editWorkCalendar(work_calendar: IfcOpenshellInstance, attributes: number): void;
    /**
     * Edit attributes of an IfcWorkPlan entity.
     *
     * @param work_plan IfcWorkPlan entity to edit.
     * @param attributes Property bag of attribute name/value pairs.
     */
    editWorkPlan(work_plan: IfcOpenshellInstance, attributes: number): void;
    /**
     * Edit attributes of an IfcWorkSchedule entity.
     *
     * @param work_schedule IfcWorkSchedule entity to edit.
     * @param attributes Property bag of attribute name/value pairs.
     */
    editWorkSchedule(work_schedule: IfcOpenshellInstance, attributes: number): void;
    /**
     * Edit attributes of an IfcWorkTime entity.
     *
     * Date attributes "Start"/"StartDate" and "Finish"/"FinishDate" are
     * automatically mapped to the correct attribute name for the schema version.
     *
     * @param work_time IfcWorkTime entity to edit.
     * @param attributes Property bag of attribute name/value pairs.
     */
    editWorkTime(work_time: IfcOpenshellInstance, attributes: number): void;
    /**
     * Recalculate an entire work schedule using the critical path method.
     *
     * Performs forward and backward passes through the task network to compute
     * early/late start/finish dates, total float, free float, and critical
     * path flags on each IfcTaskTime.
     *
     * @param file File containing the work schedule.
     * @param work_schedule IfcWorkSchedule to recalculate.
     * @throws A recursion error with the stable cyclic-task-graph code.
     */
    recalculateSchedule(file: IfcOpenshellFile, work_schedule: IfcOpenshellInstance): void;
    /**
     * Remove an IfcTask and its subtasks from the file.
     *
     * Recursively removes nested child tasks, their IfcTaskTime entities,
     * sequence relationships, control assignments, process assignments,
     * product assignments, property sets, and project declarations.
     *
     * @param file File containing the task.
     * @param task IfcTask to remove.
     * @param options Ownership options for relationship cleanup.
     */
    removeTask(file: IfcOpenshellFile, task: IfcOpenshellInstance, options: IfcOpenshellSequenceRemoveOptions): void;
    /**
     * Remove an IfcTimePeriod from the file.
     *
     * @param file File containing the time period.
     * @param time_period IfcTimePeriod to remove.
     */
    removeTimePeriod(file: IfcOpenshellFile, time_period: IfcOpenshellInstance): void;
    /**
     * Remove an IfcWorkCalendar from the file.
     *
     * Unassigns the calendar from all controlled tasks, removes all working
     * and exception times, and removes the project declaration.
     *
     * @param file File containing the calendar.
     * @param work_calendar IfcWorkCalendar to remove.
     * @param options Ownership options for relationship cleanup.
     */
    removeWorkCalendar(file: IfcOpenshellFile, work_calendar: IfcOpenshellInstance, options: IfcOpenshellSequenceRemoveOptions): void;
    /**
     * Remove an IfcWorkPlan from the file.
     *
     * Unassigns the plan from its project declaration and removes the aggregate
     * relationships to child work schedules (without removing the schedules).
     *
     * @param file File containing the work plan.
     * @param work_plan IfcWorkPlan to remove.
     * @param options Ownership options for relationship cleanup.
     */
    removeWorkPlan(file: IfcOpenshellFile, work_plan: IfcOpenshellInstance, options: IfcOpenshellSequenceRemoveOptions): void;
    /**
     * Remove an IfcWorkSchedule and its controlled tasks from the file.
     *
     * Recursively removes nested work schedules, all controlled IfcTask
     * entities (with their subtasks and relationships), aggregate and
     * declaration relationships, and the schedule itself.
     *
     * @param file File containing the work schedule.
     * @param work_schedule IfcWorkSchedule to remove.
     * @param options Ownership options for relationship cleanup.
     */
    removeWorkSchedule(file: IfcOpenshellFile, work_schedule: IfcOpenshellInstance, options: IfcOpenshellSequenceRemoveOptions): void;
    /**
     * Remove an IfcWorkTime and its associated recurrence pattern from the file.
     *
     * If the work time has a RecurrencePattern, all its TimePeriods and the
     * pattern itself are deleted first.
     *
     * @param file File containing the work time.
     * @param work_time IfcWorkTime to remove.
     */
    removeWorkTime(file: IfcOpenshellFile, work_time: IfcOpenshellInstance): void;
    /**
     * Remove the TimeLag from an IfcRelSequence.
     *
     * If the IfcLagTime is only referenced by this sequence, it is deleted.
     * Otherwise the TimeLag attribute is cleared.
     *
     * @param file File containing the sequence.
     * @param rel_sequence IfcRelSequence to remove the lag from.
     */
    unassignLagTime(file: IfcOpenshellFile, rel_sequence: IfcOpenshellInstance): void;
    /**
     * Remove a process assignment via IfcRelAssignsToProcess.
     *
     * If the relationship has only one RelatedObjects entry, the entire
     * relationship is removed. Otherwise the object is removed from the
     * aggregate.
     *
     * @param file File containing the relationship.
     * @param relating_process IfcTask to unassign from.
     * @param related_object Object to unassign.
     * @param options Ownership options.
     * @return The modified relationship, or no result when it is removed.
     */
    unassignProcess(file: IfcOpenshellFile, relating_process: IfcOpenshellInstance, related_object: IfcOpenshellInstance, options: IfcOpenshellSequenceRemoveOptions): IfcOpenshellInstance;
    /**
     * Remove a product assignment via IfcRelAssignsToProduct.
     *
     * If the relationship has only one RelatedObjects entry, the entire
     * relationship is removed. Otherwise the object is removed from the
     * aggregate.
     *
     * @param file File containing the relationship.
     * @param relating_product IfcProduct to unassign from.
     * @param related_object Object to unassign.
     * @param options Ownership options.
     * @return The modified relationship, or no result when it is removed.
     */
    unassignProduct(file: IfcOpenshellFile, relating_product: IfcOpenshellInstance, related_object: IfcOpenshellInstance, options: IfcOpenshellSequenceRemoveOptions): IfcOpenshellInstance;
    /**
     * Remove an IfcRecurrencePattern and its time periods from the file.
     *
     * Deletes all IfcTimePeriod entities in the pattern's TimePeriods aggregate,
     * then deletes the pattern itself.
     *
     * @param file File containing the recurrence pattern.
     * @param recurrence_pattern IfcRecurrencePattern to remove.
     */
    unassignRecurrencePattern(file: IfcOpenshellFile, recurrence_pattern: IfcOpenshellInstance): void;
    /**
     * Remove an IfcRelSequence between two tasks.
     *
     * Removes the sequence relationship where relating_process is the
     * predecessor and related_process is the successor, then cascades
     * schedule changes from the successor.
     *
     * @param file File containing the tasks.
     * @param relating_process Predecessor IfcTask.
     * @param related_process Successor IfcTask.
     * @throws A recursion error with the stable recursive-schedule-cascade code
     * when the remaining graph is cyclic.
     */
    unassignSequence(file: IfcOpenshellFile, relating_process: IfcOpenshellInstance, related_process: IfcOpenshellInstance): void;
  }

  export interface IfcOpenshellShapeModule {
    /**
     * Create an IfcAxis2Placement2D from position and optional reference direction.
     *
     * @param file IFC file that receives the placement.
     * @param options Position and optional X direction.
     * @return IfcAxis2Placement2D entity.
     */
    builderAxis2Placement2d(file: IfcOpenshellFile, options: IfcOpenshellShapeBuilderAxis2Placement2dOptions): IfcOpenshellInstance;
    /**
     * Create an IfcAxis2Placement3D from position and axes.
     *
     * @param file IFC file that receives the placement.
     * @param options Position, Z axis, and X axis direction ratios.
     * @return IfcAxis2Placement3D entity.
     */
    builderAxis2Placement3d(file: IfcOpenshellFile, options: IfcOpenshellShapeBuilderAxis2Placement3dOptions): IfcOpenshellInstance;
    /**
     * Create an IfcBlock (rectangular parallelepiped).
     *
     * @param file IFC file that receives the geometry.
     * @param options Position and XYZ dimensions.
     * @return IfcBlock entity.
     */
    builderBlock(file: IfcOpenshellFile, options: IfcOpenshellShapeBuilderBlockOptions): IfcOpenshellInstance;
    /**
     * Create an IfcCircle centred at the given position.
     *
     * @param file IFC file that receives the geometry.
     * @param center XY coordinates of the circle centre.
     * @param radius Circle radius in model units.
     * @return IfcCircle entity.
     */
    builderCircle(file: IfcOpenshellFile, center: [number, number], radius: number): IfcOpenshellInstance;
    /**
     * Create a 2D IfcIndexedPolyCurve arc between two points.
     *
     * Inserts a midpoint slightly offset along the dominant axis to form a
     * three-point arc segment.
     *
     * @param file IFC file that receives the geometry.
     * @param points Two XY endpoints.
     * @return IfcIndexedPolyCurve entity with one arc segment.
     */
    builderCurveBetweenTwoPoints(file: IfcOpenshellFile, points: [[number, number], [number, number]]): IfcOpenshellInstance;
    /**
     * Create an independent copy of an IFC entity and the entities it references.
     *
     * New GlobalId attributes are generated for the copied entities.
     *
     * @param file IFC file that receives the copy.
     * @param element Entity to copy.
     * @return Root entity of the copied subgraph.
     */
    builderDeepCopy(file: IfcOpenshellFile, element: IfcOpenshellInstance): IfcOpenshellInstance;
    /**
     * Create an IfcEdge between two vertex positions.
     *
     * @param file IFC file that receives the geometry.
     * @param start XYZ coordinates of the edge start.
     * @param end XYZ coordinates of the edge end.
     * @return IfcEdge entity.
     */
    builderEdge(file: IfcOpenshellFile, start: [number, number, number], end: [number, number, number]): IfcOpenshellInstance;
    /**
     * Create an IfcEllipse, optionally trimmed to an IfcTrimmedCurve.
     *
     * @param file IFC file that receives the geometry.
     * @param options Radii, position, trim points, and reference direction.
     * @return IfcEllipse or IfcTrimmedCurve entity.
     */
    builderEllipseCurve(file: IfcOpenshellFile, options: IfcOpenshellShapeBuilderEllipseCurveOptions): IfcOpenshellInstance;
    /**
     * Create an IfcExtrudedAreaSolid by extruding a profile along a direction.
     *
     * If the profile_or_curve is a bare IfcCurve (not an IfcProfileDef), it is
     * wrapped in an IfcArbitraryClosedProfileDef automatically.
     *
     * @param file IFC file that receives the geometry.
     * @param options Profile, depth, position, and extrusion direction.
     * @return IfcExtrudedAreaSolid entity.
     */
    builderExtrude(file: IfcOpenshellFile, options: IfcOpenshellShapeBuilderExtrudeOptions): IfcOpenshellInstance;
    /**
     * Create an IfcFace from an ordered list of polygon vertices.
     *
     * @param file IFC file that receives the geometry.
     * @param points XYZ coordinates defining the face outer boundary.
     * @return IfcFace entity with an IfcFaceOuterBound.
     */
    builderFace(file: IfcOpenshellFile, points: [number, number, number][]): IfcOpenshellInstance;
    /**
     * Create an IfcFacetedBrep from vertices and face index lists.
     *
     * @param file IFC file that receives the geometry.
     * @param points XYZ vertex coordinates.
     * @param faces Face index lists (zero-based). Each face is a single outer loop.
     * @return IfcFacetedBrep entity with an IfcClosedShell.
     */
    builderFacetedBrep(file: IfcOpenshellFile, points: [number, number, number][], faces: number[][]): IfcOpenshellInstance;
    /**
     * Read the coordinate list from an IfcPolyline or IfcIndexedPolyCurve.
     *
     * @param polyline IfcPolyline or IfcIndexedPolyCurve entity.
     * @return Ordered XY or XYZ coordinate sequences.
     */
    builderGetPolylineCoords(polyline: IfcOpenshellInstance): number[][];
    /**
     * Create an IfcHalfSpaceSolid bounded by a plane.
     *
     * @param file IFC file that receives the geometry.
     * @param options Bounding plane and agreement flag.
     * @return IfcHalfSpaceSolid entity.
     */
    builderHalfSpaceSolid(file: IfcOpenshellFile, options: IfcOpenshellShapeBuilderHalfSpaceSolidOptions): IfcOpenshellInstance;
    /**
     * Create a 2D IfcIndexedPolyCurve from explicit points and segment indices.
     *
     * @param file IFC file that receives the geometry.
     * @param options XY points and explicit zero-based line or arc segments.
     * @return IfcIndexedPolyCurve entity.
     */
    builderIndexedPolycurve2d(file: IfcOpenshellFile, options: IfcOpenshellShapeBuilderIndexedPolycurve2dOptions): IfcOpenshellInstance;
    /**
     * Build MEP bend geometry for a duct segment.
     *
     * Generates a swept disk solid (for circular profiles) or an extruded bend
     * shape (for rectangular profiles), plus optional start and end straight
     * extensions.
     *
     * @param file IFC file that receives the geometry.
     * @param options Segment, lengths, angle, radius, bend direction, and Z flip.
     * @return Bend result with representation and computed parameters.
     */
    builderMepBendShape(file: IfcOpenshellFile, options: IfcOpenshellShapeBuilderMepBendShapeOptions): IfcOpenshellShapeBuilderMepBendShapeResult;
    /**
     * Compute the transition angle or length between two MEP duct profiles.
     *
     * Provide either length or angle (not both) to solve for the other.
     * Returns NaN when no valid solution exists.
     *
     * @param options Profile half-dimensions, offset, and one of length or angle.
     * @return The solved angle (degrees) or length (model units), or NaN.
     */
    builderMepTransitionCalculate(options: IfcOpenshellShapeBuilderMepTransitionCalculateOptions): number;
    /**
     * Compute the minimum transition length between two MEP duct profiles at a given angle.
     *
     * @param options Profile half-dimensions, angle in degrees, and profile offset.
     * @return Required transition length in model units, or NaN if no valid solution.
     */
    builderMepTransitionLength(options: IfcOpenshellShapeBuilderMepTransitionLengthOptions): number;
    /**
     * Build MEP transition geometry between two duct segments.
     *
     * Generates start/end extrusions and a connecting transition mesh.
     * Returns no result when the segments lack material profiles or the
     * transition cannot be computed.
     *
     * @param file IFC file that receives the geometry.
     * @param options Start/end segments, lengths, angle, and profile offset.
     * @return Transition result with representation and dimensions, or no result.
     */
    builderMepTransitionShape(file: IfcOpenshellFile, options: IfcOpenshellShapeBuilderMepTransitionShapeOptions): IfcOpenshellShapeBuilderMepTransitionShapeResult | null;
    /**
     * Create a mesh representation using IfcPolygonalFaceSet (IFC4+) or IfcFacetedBrep (IFC2X3).
     *
     * @param file IFC file that receives the geometry.
     * @param points XYZ vertex coordinates.
     * @param faces Face index lists (zero-based).
     * @return IfcPolygonalFaceSet or IfcFacetedBrep entity.
     */
    builderMesh(file: IfcOpenshellFile, points: [number, number, number][], faces: number[][]): IfcOpenshellInstance;
    /**
     * Mirror a geometry item across 2D axes.
     *
     * Supports IfcIndexedPolyCurve, IfcPolyline, IfcCircle, IfcEllipse,
     * IfcTrimmedCurve, and IfcExtrudedAreaSolid. A non-zero value in
     * mirror_axes at index 0 or 1 flips the corresponding coordinate.
     *
     * @param file IFC file containing the item.
     * @param options Item, axes, point, copy flag, and optional placement matrix.
     * @return The mirrored item, either the supplied entity or an independent copy.
     */
    builderMirror(file: IfcOpenshellFile, options: IfcOpenshellShapeBuilderMirrorOptions): IfcOpenshellInstance;
    /**
     * Create an IfcPlane from a point and normal direction.
     *
     * The reference direction is computed automatically from the normal.
     *
     * @param file IFC file that receives the geometry.
     * @param location XYZ point on the plane.
     * @param normal Direction ratios of the plane normal.
     * @return IfcPlane entity.
     */
    builderPlane(file: IfcOpenshellFile, location: [number, number, number], normal: [number, number, number]): IfcOpenshellInstance;
    /**
     * Create an IfcPolygonalFaceSet from vertices and polygonal face loops.
     *
     * Each face may contain one outer loop and optional inner loops (voids).
     * Faces with multiple loops create IfcIndexedPolygonalFaceWithVoids entities.
     *
     * @param file IFC file that receives the geometry.
     * @param points XYZ vertex coordinates.
     * @param faces Per-face loop index lists (zero-based).
     * @return IfcPolygonalFaceSet entity.
     */
    builderPolygonalFaceSet(file: IfcOpenshellFile, points: [number, number, number][], faces: number[][][]): IfcOpenshellInstance;
    /**
     * Create a 2D or 3D polyline (IfcPolyline for IFC2X3, IfcIndexedPolyCurve otherwise).
     *
     * @param file IFC file that receives the geometry.
     * @param options Points, optional offset, and explicit semantic segments.
     * @return IfcPolyline or IfcIndexedPolyCurve entity.
     */
    builderPolyline(file: IfcOpenshellFile, options: IfcOpenshellShapeBuilderPolylineOptions): IfcOpenshellInstance;
    /**
     * Create an IfcArbitraryClosedProfileDef or IfcArbitraryProfileDefWithVoids.
     *
     * @param file IFC file that receives the profile.
     * @param options Outer curve, optional inner curves, name, and profile type.
     * @return IfcProfileDef entity.
     */
    builderProfile(file: IfcOpenshellFile, options: IfcOpenshellShapeBuilderProfileOptions): IfcOpenshellInstance;
    /**
     * Create an IfcShapeRepresentation or IfcTopologyRepresentation.
     *
     * The representation type is auto-detected from the items when omitted.
     * Topology types (Vertex, Edge, Path, Face, Shell) produce IfcTopologyRepresentation;
     * all others produce IfcShapeRepresentation.
     *
     * @param file IFC file that receives the representation.
     * @param options Context, items, and optional representation type.
     * @return IfcShapeRepresentation or IfcTopologyRepresentation entity.
     */
    builderRepresentation(file: IfcOpenshellFile, options: IfcOpenshellShapeBuilderRepresentationOptions): IfcOpenshellInstance;
    /**
     * Rotate a geometry item around a 2D pivot point.
     *
     * Supports IfcIndexedPolyCurve, IfcPolyline, IfcCircle, and
     * IfcExtrudedAreaSolid. The angle is in degrees.
     *
     * @param file IFC file containing the item.
     * @param options Item, angle, pivot, direction, and copy flag.
     * @return The rotated item, either the supplied entity or an independent copy.
     */
    builderRotate(file: IfcOpenshellFile, options: IfcOpenshellShapeBuilderRotateOptions): IfcOpenshellInstance;
    /**
     * Replace the coordinate list of an IfcPolyline or IfcIndexedPolyCurve.
     *
     * For IfcPolyline, the new coordinate count must match the existing point count.
     *
     * @param file IFC file containing the polyline.
     * @param polyline IfcPolyline or IfcIndexedPolyCurve entity.
     * @param coords Replacement coordinates.
     * @return The modified polyline entity.
     */
    builderSetPolylineCoords(file: IfcOpenshellFile, polyline: IfcOpenshellInstance, coords: [number, number][] | [number, number, number][]): IfcOpenshellInstance;
    /**
     * Create an IfcSphere.
     *
     * @param file IFC file that receives the geometry.
     * @param options Radius and centre position.
     * @return IfcSphere entity.
     */
    builderSphere(file: IfcOpenshellFile, options: IfcOpenshellShapeBuilderSphereOptions): IfcOpenshellInstance;
    /**
     * Create an IfcSweptDiskSolid along a directrix curve.
     *
     * @param file IFC file that receives the geometry.
     * @param path_curve IfcCurve entity defining the sweep path.
     * @param radius Disk radius in model units.
     * @return IfcSweptDiskSolid entity.
     */
    builderSweptDiskSolid(file: IfcOpenshellFile, path_curve: IfcOpenshellInstance, radius: number): IfcOpenshellInstance;
    /**
     * Translate a geometry item by a direction and distance.
     *
     * Supports IfcIndexedPolyCurve, IfcPolyline, IfcCircle, IfcEllipse,
     * IfcExtrudedAreaSolid, IfcTessellatedFaceSet, IfcShapeRepresentation,
     * and IfcTrimmedCurve.
     *
     * @param file IFC file containing the item.
     * @param options Item, translation, and copy flag.
     * @return The translated item, either the supplied entity or an independent copy.
     */
    builderTranslate(file: IfcOpenshellFile, options: IfcOpenshellShapeBuilderTranslateOptions): IfcOpenshellInstance;
    /**
     * Create an IfcTriangulatedFaceSet from vertices and triangle index lists.
     *
     * @param file IFC file that receives the geometry.
     * @param points XYZ vertex coordinates.
     * @param faces Triangle index lists (zero-based, truncated to 3 vertices each).
     * @return IfcTriangulatedFaceSet entity.
     */
    builderTriangulatedFaceSet(file: IfcOpenshellFile, points: [number, number, number][], faces: [number, number, number][]): IfcOpenshellInstance;
    /**
     * Create an IfcVertexPoint at the given position.
     *
     * @param file IFC file that receives the geometry.
     * @param position XYZ coordinates of the vertex.
     * @return IfcVertexPoint entity.
     */
    builderVertex(file: IfcOpenshellFile, position: [number, number, number]): IfcOpenshellInstance;
    /**
     * Check whether two floating-point values are approximately equal.
     *
     * Uses strict less-than comparison. When tolerance is 0.0, it defaults
     * to 1e-6.
     *
     * @param value First value.
     * @param x Second value.
     * @param tolerance Maximum absolute difference (exclusive). Defaults to 1e-6 when 0.
     * @return True if |value - x| < tolerance.
     */
    isAlmostEqual(value: number, x: number, tolerance: number): boolean;
  }

  export interface IfcOpenshellShapeBuilderModule {
    /**
     * Create an IfcAxis2Placement2D from position and optional reference direction.
     *
     * @param file IFC file that receives the placement.
     * @param options Position and optional X direction.
     * @return IfcAxis2Placement2D entity.
     */
    axis2Placement2d(file: IfcOpenshellFile, options: IfcOpenshellShapeBuilderAxis2Placement2dOptions): IfcOpenshellInstance;
    /**
     * Create an IfcAxis2Placement3D from position and axes.
     *
     * @param file IFC file that receives the placement.
     * @param options Position, Z axis, and X axis direction ratios.
     * @return IfcAxis2Placement3D entity.
     */
    axis2Placement3d(file: IfcOpenshellFile, options: IfcOpenshellShapeBuilderAxis2Placement3dOptions): IfcOpenshellInstance;
    /**
     * Create an IfcBlock (rectangular parallelepiped).
     *
     * @param file IFC file that receives the geometry.
     * @param options Position and XYZ dimensions.
     * @return IfcBlock entity.
     */
    block(file: IfcOpenshellFile, options: IfcOpenshellShapeBuilderBlockOptions): IfcOpenshellInstance;
    /**
     * Create an IfcCircle centred at the given position.
     *
     * @param file IFC file that receives the geometry.
     * @param center XY coordinates of the circle centre.
     * @param radius Circle radius in model units.
     * @return IfcCircle entity.
     */
    circle(file: IfcOpenshellFile, center: [number, number], radius: number): IfcOpenshellInstance;
    /**
     * Create a 2D IfcIndexedPolyCurve arc between two points.
     *
     * Inserts a midpoint slightly offset along the dominant axis to form a
     * three-point arc segment.
     *
     * @param file IFC file that receives the geometry.
     * @param points Two XY endpoints.
     * @return IfcIndexedPolyCurve entity with one arc segment.
     */
    curveBetweenTwoPoints(file: IfcOpenshellFile, points: [[number, number], [number, number]]): IfcOpenshellInstance;
    /**
     * Create an independent copy of an IFC entity and the entities it references.
     *
     * New GlobalId attributes are generated for the copied entities.
     *
     * @param file IFC file that receives the copy.
     * @param element Entity to copy.
     * @return Root entity of the copied subgraph.
     */
    deepCopy(file: IfcOpenshellFile, element: IfcOpenshellInstance): IfcOpenshellInstance;
    /**
     * Create an IfcEdge between two vertex positions.
     *
     * @param file IFC file that receives the geometry.
     * @param start XYZ coordinates of the edge start.
     * @param end XYZ coordinates of the edge end.
     * @return IfcEdge entity.
     */
    edge(file: IfcOpenshellFile, start: [number, number, number], end: [number, number, number]): IfcOpenshellInstance;
    /**
     * Create an IfcEllipse, optionally trimmed to an IfcTrimmedCurve.
     *
     * @param file IFC file that receives the geometry.
     * @param options Radii, position, trim points, and reference direction.
     * @return IfcEllipse or IfcTrimmedCurve entity.
     */
    ellipseCurve(file: IfcOpenshellFile, options: IfcOpenshellShapeBuilderEllipseCurveOptions): IfcOpenshellInstance;
    /**
     * Create an IfcExtrudedAreaSolid by extruding a profile along a direction.
     *
     * If the profile_or_curve is a bare IfcCurve (not an IfcProfileDef), it is
     * wrapped in an IfcArbitraryClosedProfileDef automatically.
     *
     * @param file IFC file that receives the geometry.
     * @param options Profile, depth, position, and extrusion direction.
     * @return IfcExtrudedAreaSolid entity.
     */
    extrude(file: IfcOpenshellFile, options: IfcOpenshellShapeBuilderExtrudeOptions): IfcOpenshellInstance;
    /**
     * Create an IfcFace from an ordered list of polygon vertices.
     *
     * @param file IFC file that receives the geometry.
     * @param points XYZ coordinates defining the face outer boundary.
     * @return IfcFace entity with an IfcFaceOuterBound.
     */
    face(file: IfcOpenshellFile, points: [number, number, number][]): IfcOpenshellInstance;
    /**
     * Create an IfcFacetedBrep from vertices and face index lists.
     *
     * @param file IFC file that receives the geometry.
     * @param points XYZ vertex coordinates.
     * @param faces Face index lists (zero-based). Each face is a single outer loop.
     * @return IfcFacetedBrep entity with an IfcClosedShell.
     */
    facetedBrep(file: IfcOpenshellFile, points: [number, number, number][], faces: number[][]): IfcOpenshellInstance;
    /**
     * Read the coordinate list from an IfcPolyline or IfcIndexedPolyCurve.
     *
     * @param polyline IfcPolyline or IfcIndexedPolyCurve entity.
     * @return Ordered XY or XYZ coordinate sequences.
     */
    getPolylineCoords(polyline: IfcOpenshellInstance): number[][];
    /**
     * Create an IfcHalfSpaceSolid bounded by a plane.
     *
     * @param file IFC file that receives the geometry.
     * @param options Bounding plane and agreement flag.
     * @return IfcHalfSpaceSolid entity.
     */
    halfSpaceSolid(file: IfcOpenshellFile, options: IfcOpenshellShapeBuilderHalfSpaceSolidOptions): IfcOpenshellInstance;
    /**
     * Create a 2D IfcIndexedPolyCurve from explicit points and segment indices.
     *
     * @param file IFC file that receives the geometry.
     * @param options XY points and explicit zero-based line or arc segments.
     * @return IfcIndexedPolyCurve entity.
     */
    indexedPolycurve2d(file: IfcOpenshellFile, options: IfcOpenshellShapeBuilderIndexedPolycurve2dOptions): IfcOpenshellInstance;
    /**
     * Build MEP bend geometry for a duct segment.
     *
     * Generates a swept disk solid (for circular profiles) or an extruded bend
     * shape (for rectangular profiles), plus optional start and end straight
     * extensions.
     *
     * @param file IFC file that receives the geometry.
     * @param options Segment, lengths, angle, radius, bend direction, and Z flip.
     * @return Bend result with representation and computed parameters.
     */
    mepBendShape(file: IfcOpenshellFile, options: IfcOpenshellShapeBuilderMepBendShapeOptions): IfcOpenshellShapeBuilderMepBendShapeResult;
    /**
     * Compute the transition angle or length between two MEP duct profiles.
     *
     * Provide either length or angle (not both) to solve for the other.
     * Returns NaN when no valid solution exists.
     *
     * @param options Profile half-dimensions, offset, and one of length or angle.
     * @return The solved angle (degrees) or length (model units), or NaN.
     */
    mepTransitionCalculate(options: IfcOpenshellShapeBuilderMepTransitionCalculateOptions): number;
    /**
     * Compute the minimum transition length between two MEP duct profiles at a given angle.
     *
     * @param options Profile half-dimensions, angle in degrees, and profile offset.
     * @return Required transition length in model units, or NaN if no valid solution.
     */
    mepTransitionLength(options: IfcOpenshellShapeBuilderMepTransitionLengthOptions): number;
    /**
     * Build MEP transition geometry between two duct segments.
     *
     * Generates start/end extrusions and a connecting transition mesh.
     * Returns no result when the segments lack material profiles or the
     * transition cannot be computed.
     *
     * @param file IFC file that receives the geometry.
     * @param options Start/end segments, lengths, angle, and profile offset.
     * @return Transition result with representation and dimensions, or no result.
     */
    mepTransitionShape(file: IfcOpenshellFile, options: IfcOpenshellShapeBuilderMepTransitionShapeOptions): IfcOpenshellShapeBuilderMepTransitionShapeResult | null;
    /**
     * Create a mesh representation using IfcPolygonalFaceSet (IFC4+) or IfcFacetedBrep (IFC2X3).
     *
     * @param file IFC file that receives the geometry.
     * @param points XYZ vertex coordinates.
     * @param faces Face index lists (zero-based).
     * @return IfcPolygonalFaceSet or IfcFacetedBrep entity.
     */
    mesh(file: IfcOpenshellFile, points: [number, number, number][], faces: number[][]): IfcOpenshellInstance;
    /**
     * Mirror a geometry item across 2D axes.
     *
     * Supports IfcIndexedPolyCurve, IfcPolyline, IfcCircle, IfcEllipse,
     * IfcTrimmedCurve, and IfcExtrudedAreaSolid. A non-zero value in
     * mirror_axes at index 0 or 1 flips the corresponding coordinate.
     *
     * @param file IFC file containing the item.
     * @param options Item, axes, point, copy flag, and optional placement matrix.
     * @return The mirrored item, either the supplied entity or an independent copy.
     */
    mirror(file: IfcOpenshellFile, options: IfcOpenshellShapeBuilderMirrorOptions): IfcOpenshellInstance;
    /**
     * Create an IfcPlane from a point and normal direction.
     *
     * The reference direction is computed automatically from the normal.
     *
     * @param file IFC file that receives the geometry.
     * @param location XYZ point on the plane.
     * @param normal Direction ratios of the plane normal.
     * @return IfcPlane entity.
     */
    plane(file: IfcOpenshellFile, location: [number, number, number], normal: [number, number, number]): IfcOpenshellInstance;
    /**
     * Create an IfcPolygonalFaceSet from vertices and polygonal face loops.
     *
     * Each face may contain one outer loop and optional inner loops (voids).
     * Faces with multiple loops create IfcIndexedPolygonalFaceWithVoids entities.
     *
     * @param file IFC file that receives the geometry.
     * @param points XYZ vertex coordinates.
     * @param faces Per-face loop index lists (zero-based).
     * @return IfcPolygonalFaceSet entity.
     */
    polygonalFaceSet(file: IfcOpenshellFile, points: [number, number, number][], faces: number[][][]): IfcOpenshellInstance;
    /**
     * Create a 2D or 3D polyline (IfcPolyline for IFC2X3, IfcIndexedPolyCurve otherwise).
     *
     * @param file IFC file that receives the geometry.
     * @param options Points, optional offset, and explicit semantic segments.
     * @return IfcPolyline or IfcIndexedPolyCurve entity.
     */
    polyline(file: IfcOpenshellFile, options: IfcOpenshellShapeBuilderPolylineOptions): IfcOpenshellInstance;
    /**
     * Create an IfcArbitraryClosedProfileDef or IfcArbitraryProfileDefWithVoids.
     *
     * @param file IFC file that receives the profile.
     * @param options Outer curve, optional inner curves, name, and profile type.
     * @return IfcProfileDef entity.
     */
    profile(file: IfcOpenshellFile, options: IfcOpenshellShapeBuilderProfileOptions): IfcOpenshellInstance;
    /**
     * Create an IfcShapeRepresentation or IfcTopologyRepresentation.
     *
     * The representation type is auto-detected from the items when omitted.
     * Topology types (Vertex, Edge, Path, Face, Shell) produce IfcTopologyRepresentation;
     * all others produce IfcShapeRepresentation.
     *
     * @param file IFC file that receives the representation.
     * @param options Context, items, and optional representation type.
     * @return IfcShapeRepresentation or IfcTopologyRepresentation entity.
     */
    representation(file: IfcOpenshellFile, options: IfcOpenshellShapeBuilderRepresentationOptions): IfcOpenshellInstance;
    /**
     * Rotate a geometry item around a 2D pivot point.
     *
     * Supports IfcIndexedPolyCurve, IfcPolyline, IfcCircle, and
     * IfcExtrudedAreaSolid. The angle is in degrees.
     *
     * @param file IFC file containing the item.
     * @param options Item, angle, pivot, direction, and copy flag.
     * @return The rotated item, either the supplied entity or an independent copy.
     */
    rotate(file: IfcOpenshellFile, options: IfcOpenshellShapeBuilderRotateOptions): IfcOpenshellInstance;
    /**
     * Replace the coordinate list of an IfcPolyline or IfcIndexedPolyCurve.
     *
     * For IfcPolyline, the new coordinate count must match the existing point count.
     *
     * @param file IFC file containing the polyline.
     * @param polyline IfcPolyline or IfcIndexedPolyCurve entity.
     * @param coords Replacement coordinates.
     * @return The modified polyline entity.
     */
    setPolylineCoords(file: IfcOpenshellFile, polyline: IfcOpenshellInstance, coords: [number, number][] | [number, number, number][]): IfcOpenshellInstance;
    /**
     * Create an IfcSphere.
     *
     * @param file IFC file that receives the geometry.
     * @param options Radius and centre position.
     * @return IfcSphere entity.
     */
    sphere(file: IfcOpenshellFile, options: IfcOpenshellShapeBuilderSphereOptions): IfcOpenshellInstance;
    /**
     * Create an IfcSweptDiskSolid along a directrix curve.
     *
     * @param file IFC file that receives the geometry.
     * @param path_curve IfcCurve entity defining the sweep path.
     * @param radius Disk radius in model units.
     * @return IfcSweptDiskSolid entity.
     */
    sweptDiskSolid(file: IfcOpenshellFile, path_curve: IfcOpenshellInstance, radius: number): IfcOpenshellInstance;
    /**
     * Translate a geometry item by a direction and distance.
     *
     * Supports IfcIndexedPolyCurve, IfcPolyline, IfcCircle, IfcEllipse,
     * IfcExtrudedAreaSolid, IfcTessellatedFaceSet, IfcShapeRepresentation,
     * and IfcTrimmedCurve.
     *
     * @param file IFC file containing the item.
     * @param options Item, translation, and copy flag.
     * @return The translated item, either the supplied entity or an independent copy.
     */
    translate(file: IfcOpenshellFile, options: IfcOpenshellShapeBuilderTranslateOptions): IfcOpenshellInstance;
    /**
     * Create an IfcTriangulatedFaceSet from vertices and triangle index lists.
     *
     * @param file IFC file that receives the geometry.
     * @param points XYZ vertex coordinates.
     * @param faces Triangle index lists (zero-based, truncated to 3 vertices each).
     * @return IfcTriangulatedFaceSet entity.
     */
    triangulatedFaceSet(file: IfcOpenshellFile, points: [number, number, number][], faces: [number, number, number][]): IfcOpenshellInstance;
    /**
     * Create an IfcVertexPoint at the given position.
     *
     * @param file IFC file that receives the geometry.
     * @param position XYZ coordinates of the vertex.
     * @return IfcVertexPoint entity.
     */
    vertex(file: IfcOpenshellFile, position: [number, number, number]): IfcOpenshellInstance;
  }

  export interface IfcOpenshellSpatialModule {
    /**
     * Contain products in a spatial structure via IfcRelContainedInSpatialStructure.
     *
     * Products previously contained in a different structure are moved. Products
     * previously aggregated under a different parent (IfcRelAggregates) are
     * removed from that aggregation. If an existing containment relationship
     * already relates to the same structure, products are merged into it.
     */
    assignContainer(file: IfcOpenshellFile, options: IfcOpenshellSpatialAssignContainerOptions): IfcOpenshellInstance;
    /**
     * Remove products from a spatial structure reference relationship.
     *
     * Removes products from IfcRelReferencedInSpatialStructure relationships
     * for the given structure. If no products remain, the relationship is deleted.
     */
    dereferenceStructure(file: IfcOpenshellFile, options: IfcOpenshellSpatialDereferenceStructureOptions): void;
    /**
     * Reference products in a spatial structure via IfcRelReferencedInSpatialStructure.
     *
     * Unlike containment, referencing does not establish ownership. Products
     * already referenced by the same structure are skipped.
     */
    referenceStructure(file: IfcOpenshellFile, options: IfcOpenshellSpatialReferenceStructureOptions): IfcOpenshellInstance;
    /**
     * Remove products from their IfcRelContainedInSpatialStructure relationships.
     *
     * If no related elements remain after removal, the relationship is deleted.
     */
    unassignContainer(file: IfcOpenshellFile, options: IfcOpenshellSpatialUnassignContainerOptions): void;
  }

  export interface IfcOpenshellStructuralModule {
    /**
     * Create an IfcStructuralActivity and connect it to a structural member.
     *
     * Creates the activity entity of the given class and predefined type, sets
     * its AppliedLoad and GlobalOrLocal attributes, and creates an
     * IfcRelConnectsStructuralActivity linking the activity to the structural
     * member.
     *
     * @param file File that receives the new entities.
     * @param applied_load IfcStructuralLoad to apply.
     * @param structural_member Structural member to connect the activity to.
     * @param ifc_class Schema-dynamic IFC class name (e.g. "IfcStructuralPlanarAction"); intentionally not narrowed.
     * @param predefined_type Schema-dynamic predefined type value; intentionally not narrowed.
     * @param global_or_local "GLOBAL_COORDS" or "LOCAL_COORDS".
     * @param options Ownership options for the activity and relationship.
     * @return Newly created IfcStructuralActivity.
     */
    addStructuralActivity(file: IfcOpenshellFile, applied_load: IfcOpenshellInstance, structural_member: IfcOpenshellInstance, ifc_class: string, predefined_type: string, global_or_local: StructuralGlobalOrLocal, options: IfcOpenshellStructuralAddStructuralActivityOptions): IfcOpenshellInstance;
    /**
     * Create an IfcStructuralAnalysisModel with PredefinedType LOADING_3D.
     *
     * @param file File that receives the new entity.
     * @param owner_history Owner history for the new entity. When omitted, no owner history is assigned.
     * @return Newly created IfcStructuralAnalysisModel.
     */
    addStructuralAnalysisModel(file: IfcOpenshellFile, owner_history: IfcOpenshellInstance | null): IfcOpenshellInstance;
    /**
     * Create an IfcBoundaryCondition subclass entity.
     *
     * When a connection is provided, the boundary class is inferred:
     * IfcStructuralPointConnection yields IfcBoundaryNodeCondition,
     * IfcStructuralCurveConnection yields IfcBoundaryEdgeCondition,
     * IfcStructuralSurfaceConnection yields IfcBoundaryFaceCondition.
     * The condition is applied to the connection's AppliedCondition attribute.
     *
     * @param file File that receives the new entity.
     * @param ifc_class IFC boundary condition class name. Overridden when connection is provided.
     * @param options Name and connection options.
     * @return Newly created IfcBoundaryCondition subclass.
     */
    addStructuralBoundaryCondition(file: IfcOpenshellFile, ifc_class: string, options: IfcOpenshellStructuralAddStructuralBoundaryConditionOptions): IfcOpenshellInstance;
    /**
     * Create an IfcStructuralLoad subclass entity.
     *
     * @param file File that receives the new entity.
     * @param ifc_class IFC class name (e.g. "IfcStructuralLoadConfiguration").
     * @param name Optional name for the load entity.
     * @return Newly created IfcStructuralLoad subclass.
     */
    addStructuralLoad(file: IfcOpenshellFile, ifc_class: string, name: string | null): IfcOpenshellInstance;
    /**
     * Create an IfcStructuralLoadCase entity.
     *
     * Creates the load case with PredefinedType LOAD_CASE and the given
     * ActionType and ActionSource enum values.
     *
     * @param file File that receives the new entity.
     * @param name Name for the load case.
     * @param action_type ActionType enum value (e.g. "PERMANENT_G", "VARIABLE_Q").
     * @param action_source ActionSource enum value (e.g. "WIND", "IMPOSED").
     * @param owner_history Owner history for the new entity. When omitted, no owner history is assigned.
     * @return Newly created IfcStructuralLoadCase.
     */
    addStructuralLoadCase(file: IfcOpenshellFile, name: string, action_type: string, action_source: string, owner_history: IfcOpenshellInstance | null): IfcOpenshellInstance;
    /**
     * Create an IfcStructuralLoadGroup entity.
     *
     * Creates the load group with PredefinedType LOAD_GROUP and the given
     * ActionType and ActionSource enum values.
     *
     * @param file File that receives the new entity.
     * @param name Name for the load group.
     * @param action_type ActionType enum value.
     * @param action_source ActionSource enum value.
     * @param owner_history Owner history for the new entity. When omitted, no owner history is assigned.
     * @return Newly created IfcStructuralLoadGroup.
     */
    addStructuralLoadGroup(file: IfcOpenshellFile, name: string, action_type: string, action_source: string, owner_history: IfcOpenshellInstance | null): IfcOpenshellInstance;
    /**
     * Connect a structural member to a structural connection via IfcRelConnectsStructuralMember.
     *
     * If a connection already exists between the two, the existing relationship
     * is returned.
     *
     * @param file File containing both entities.
     * @param relating_structural_member IfcStructuralMember to connect.
     * @param related_structural_connection IfcStructuralConnection to connect to.
     * @param owner_history Owner history for the new relationship. When omitted, no owner history is assigned.
     * @return The IfcRelConnectsStructuralMember relationship.
     */
    addStructuralMemberConnection(file: IfcOpenshellFile, relating_structural_member: IfcOpenshellInstance, related_structural_connection: IfcOpenshellInstance, owner_history: IfcOpenshellInstance | null): IfcOpenshellInstance;
    /**
     * Assign a structural member or connection to a product via IfcRelAssignsToProduct.
     *
     * If a relationship already exists between the two, the object is appended
     * to the existing relationship's RelatedObjects. Otherwise a new
     * IfcRelAssignsToProduct is created.
     *
     * @param file File containing both entities.
     * @param relating_product IfcProduct that the structural item references.
     * @param related_object Structural item to assign.
     * @param owner_history Owner history for new relationships. When omitted, no owner history is assigned.
     * @return The IfcRelAssignsToProduct relationship.
     */
    assignProduct(file: IfcOpenshellFile, relating_product: IfcOpenshellInstance, related_object: IfcOpenshellInstance, owner_history: IfcOpenshellInstance | null): IfcOpenshellInstance;
    /**
     * Assign products to an IfcStructuralAnalysisModel via IfcRelAssignsToGroup.
     *
     * @param file File containing the products and model.
     * @param products Products to assign to the model.
     * @param structural_analysis_model IfcStructuralAnalysisModel to assign to.
     * @param options Ownership options for the relationship.
     * @return The IfcRelAssignsToGroup relationship.
     */
    assignStructuralAnalysisModel(file: IfcOpenshellFile, products: IfcOpenshellInstance[], structural_analysis_model: IfcOpenshellInstance, options: IfcOpenshellStructuralAssignStructuralAnalysisModelOptions): IfcOpenshellInstance;
    /**
     * Assign an IfcStructuralAnalysisModel to a building via IfcRelServicesBuildings.
     *
     * If a relationship already exists for this model, the building is appended
     * to its RelatedBuildings aggregate.
     *
     * @param file File containing both entities.
     * @param structural_analysis_model IfcStructuralAnalysisModel to assign.
     * @param building IfcBuilding to assign to.
     * @param owner_history Owner history for the new relationship. When omitted, no owner history is assigned.
     * @return The IfcRelServicesBuildings relationship.
     */
    assignToBuilding(file: IfcOpenshellFile, structural_analysis_model: IfcOpenshellInstance, building: IfcOpenshellInstance, owner_history: IfcOpenshellInstance | null): IfcOpenshellInstance;
    /** Edit an IfcStructuralAnalysisModel using the shared attribute property writer. */
    editStructuralAnalysisModel(file: IfcOpenshellFile, structural_analysis_model: IfcOpenshellInstance, attributes: number): void;
    /**
     * Edit attributes of an IfcBoundaryCondition subclass.
     *
     * Each entry in the attributes mapping must contain "type" and
     * "value" sub-entries. The type specifies the IFC typed value class (e.g.
     * "IfcBoolean", "IfcForceMeasure") or "string"/"blank" for direct values.
     *
     * @param file File containing the boundary condition.
     * @param condition IfcBoundaryCondition entity to edit.
     * @param attributes Property bag of typed attribute entries.
     */
    editStructuralBoundaryCondition(file: IfcOpenshellFile, condition: IfcOpenshellInstance, attributes: number): void;
    /**
     * Edit the ConditionCoordinateSystem of a structural item.
     *
     * Replaces the Axis and RefDirection directions on the item's
     * ConditionCoordinateSystem (IfcAxis2Placement3D). Creates the placement
     * if absent. Old direction entities are deleted if unreferenced.
     *
     * @param file File containing the structural item.
     * @param structural_item Structural item (e.g. IfcStructuralPointConnection).
     * @param axis 3-element direction ratios for the Axis attribute.
     * @param ref_direction 3-element direction ratios for the RefDirection attribute.
     */
    editStructuralConnectionCs(file: IfcOpenshellFile, structural_item: IfcOpenshellInstance, axis: [number, number, number], ref_direction: [number, number, number]): void;
    /**
     * Edit the Axis direction of a structural item.
     *
     * Replaces the Axis direction on the structural item (e.g.
     * IfcStructuralCurveMember). The old direction entity is deleted if
     * unreferenced.
     *
     * @param file File containing the structural item.
     * @param structural_item Structural item with an Axis attribute.
     * @param axis 3-element direction ratios.
     */
    editStructuralItemAxis(file: IfcOpenshellFile, structural_item: IfcOpenshellInstance, axis: [number, number, number]): void;
    /** Edit an IfcStructuralLoad using the shared attribute property writer. */
    editStructuralLoad(file: IfcOpenshellFile, structural_load: IfcOpenshellInstance, attributes: number): void;
    /** Edit an IfcStructuralLoadCase using the shared attribute property writer. */
    editStructuralLoadCase(file: IfcOpenshellFile, structural_load_case: IfcOpenshellInstance, attributes: number): void;
    /**
     * Remove an IfcStructuralAnalysisModel from the file.
     *
     * Removes the model's IfcRelAssignsToGroup relationships and then the
     * model entity itself.
     *
     * @param file File containing the model.
     * @param structural_analysis_model IfcStructuralAnalysisModel to remove.
     */
    removeStructuralAnalysisModel(file: IfcOpenshellFile, structural_analysis_model: IfcOpenshellInstance): void;
    /**
     * Remove a boundary condition from a structural connection.
     *
     * When connection is provided, clears and deletes its AppliedCondition.
     * When boundary_condition is provided instead, clears AppliedCondition on
     * all referencing entities and deletes the condition. At least one of
     * connection or boundary_condition must be provided.
     *
     * @param file File containing the entities.
     * @param options Connection or boundary condition to remove.
     */
    removeStructuralBoundaryCondition(file: IfcOpenshellFile, options: IfcOpenshellStructuralRemoveStructuralBoundaryConditionOptions): void;
    /**
     * Remove an IfcRelConnectsStructuralMember and its AppliedCondition.
     *
     * Removes the boundary condition from the related structural connection
     * (if any), then removes the relationship and its OwnerHistory.
     *
     * @param file File containing the relationship.
     * @param relation IfcRelConnectsStructuralMember to remove.
     */
    removeStructuralConnectionCondition(file: IfcOpenshellFile, relation: IfcOpenshellInstance): void;
    /**
     * Remove an IfcStructuralLoad subclass from the file.
     *
     * @param file File containing the load.
     * @param structural_load IfcStructuralLoad entity to remove.
     */
    removeStructuralLoad(file: IfcOpenshellFile, structural_load: IfcOpenshellInstance): void;
    /**
     * Remove an IfcStructuralLoadCase from the file.
     *
     * Removes the load case's IfcRelAssignsToGroup relationships and then the
     * entity itself.
     *
     * @param file File containing the load case.
     * @param structural_load_case IfcStructuralLoadCase to remove.
     */
    removeStructuralLoadCase(file: IfcOpenshellFile, structural_load_case: IfcOpenshellInstance): void;
    /**
     * Remove an IfcStructuralLoadGroup from the file.
     *
     * Removes singleton IfcRelAssignsToGroup relationships and then the entity
     * itself.
     *
     * @param file File containing the load group.
     * @param structural_load_group IfcStructuralLoadGroup to remove.
     */
    removeStructuralLoadGroup(file: IfcOpenshellFile, structural_load_group: IfcOpenshellInstance): void;
    /**
     * Remove products from an IfcStructuralAnalysisModel's group.
     *
     * @param file File containing the products and model.
     * @param products Products to unassign from the model.
     * @param structural_analysis_model IfcStructuralAnalysisModel to unassign from.
     * @param options Ownership options for updating the relationship.
     */
    unassignStructuralAnalysisModel(file: IfcOpenshellFile, products: IfcOpenshellInstance[], structural_analysis_model: IfcOpenshellInstance, options: IfcOpenshellStructuralUnassignStructuralAnalysisModelOptions): void;
  }

  export interface IfcOpenshellStyleModule {
    /**
     * Create a new presentation style entity.
     *
     * For IfcSurfaceStyle, the Side attribute defaults to "BOTH".
     *
     * @param file IFC file that receives the style.
     * @param name Style name. When omitted, the style is unnamed.
     * @param ifc_class IFC entity class (e.g. "IfcSurfaceStyle", "IfcFillAreaStyle").
     * @return Newly created style entity.
     */
    addStyle(file: IfcOpenshellFile, name: string | null, ifc_class: string): IfcOpenshellInstance;
    /**
     * Create and attach a surface-style presentation component.
     *
     * The class defaults to IfcSurfaceStyleShading. Attributes are applied by
     * the semantic surface-style editor. Existing components of the same select
     * class are removed with nested cleanup before the new component is appended;
     * shading and rendering conflict in both directions.
     */
    addSurfaceStyle(file: IfcOpenshellFile, style: IfcOpenshellInstance, ifc_class: string | null, attributes: number): IfcOpenshellInstance;
    /**
     * Create image textures and their coordinate mappings in descriptor order.
     *
     * IFC2X3 returns an empty list without mutation. Omitted mapping modes create
     * no mapping; invalid modes are rejected before mutation. UV mappings append
     * each texture once to every supplied coordinate map while preserving order.
     */
    addSurfaceTextures(file: IfcOpenshellFile, textures: IfcOpenshellStyleSurfaceTextureOptions[], uv_maps?: IfcOpenshellParseInstanceList | null): IfcOpenshellParseInstanceList;
    /**
     * Assign or replace a style on a single representation item.
     *
     * Creates an IfcStyledItem (and optionally an IfcPresentationStyleAssignment
     * for IFC2X3) linking the item to the given style. If the item already has a
     * styled item, the existing style is replaced. When style is omitted, the
     * styled item is removed from the representation item.
     *
     * @param file IFC file to modify.
     * @param options Item, style, and IFC2X3 compat flag.
     * @return The IfcStyledItem, or no result when the style is removed.
     */
    assignItemStyle(file: IfcOpenshellFile, options: IfcOpenshellStyleAssignItemStyleOptions): IfcOpenshellInstance;
    /**
     * Assign a style to a material via IfcMaterialDefinitionRepresentation.
     *
     * Creates or extends a styled representation under the material's definition.
     * Also propagates the style to shape aspects whose names match material
     * constituent names.
     *
     * @param file IFC file to modify.
     * @param material IfcMaterial entity.
     * @param style Presentation style entity to assign.
     * @param context IfcGeometricRepresentationContext for the styled representation.
     * @param should_use_presentation_style_assignment Wrap style in IfcPresentationStyleAssignment.
     */
    assignMaterialStyle(file: IfcOpenshellFile, material: IfcOpenshellInstance, style: IfcOpenshellInstance, context: IfcOpenshellInstance, should_use_presentation_style_assignment: boolean): void;
    /**
     * Assign styles to the geometric items within a shape representation.
     *
     * Assigns the styles to representation items in sequence. When
     * replace_previous_same_type_style is true, an existing style of the same IFC
     * class is replaced instead of appended.
     *
     * @param file IFC file to modify.
     * @param shape_representation IfcShapeRepresentation to assign styles to.
     * @param styles Presentation style entities to assign.
     * @param should_use_presentation_style_assignment Wrap styles in IfcPresentationStyleAssignment.
     * @param replace_previous_same_type_style Replace existing styles of the same type.
     * @return List of newly created IfcStyledItem entities.
     */
    assignRepresentationStyles(file: IfcOpenshellFile, shape_representation: IfcOpenshellInstance, styles: IfcOpenshellInstance[], should_use_presentation_style_assignment: boolean, replace_previous_same_type_style: boolean): IfcOpenshellParseInstanceList;
    /** Edit an IfcPresentationStyle using the shared attribute property writer. */
    editPresentationStyle(file: IfcOpenshellFile, style: IfcOpenshellInstance, attributes: number): void;
    /**
     * Edit attributes of an IfcSurfaceStyle or its nested surface styles.
     *
     * Handles colour attributes (IfcColourRgb), specular highlights, and
     * colour-or-factor properties specially; other attributes are set directly.
     *
     * @param file IFC file containing the style.
     * @param style IfcSurfaceStyle entity to modify.
     * @param attributes Attribute name-to-value mapping.
     */
    editSurfaceStyle(file: IfcOpenshellFile, style: IfcOpenshellInstance, attributes: number): void;
    /**
     * Remove a presentation style and clean up all references to it.
     *
     * Removes inverse IfcStyledItem references, nested surface styles (for
     * IfcSurfaceStyle), fill area style hatching, and orphaned
     * IfcPresentationStyleAssignment entities.
     *
     * @param file IFC file to modify.
     * @param style Presentation style entity to remove.
     */
    removeStyle(file: IfcOpenshellFile, style: IfcOpenshellInstance): void;
    /**
     * Remove an IfcStyledRepresentation and its parent IfcMaterialDefinitionRepresentation.
     *
     * @param file IFC file to modify.
     * @param representation IfcStyledRepresentation entity to remove.
     */
    removeStyledRepresentation(file: IfcOpenshellFile, representation: IfcOpenshellInstance): void;
    /**
     * Remove an IfcSurfaceStyleWithTextures or IfcSurfaceStyleRendering and its nested entities.
     *
     * Removes texture coordinates, textures, and colour entities belonging to the
     * surface style when they are no longer referenced.
     *
     * @param file IFC file to modify.
     * @param style Surface style sub-entity to remove.
     */
    removeSurfaceStyle(file: IfcOpenshellFile, style: IfcOpenshellInstance): void;
    /**
     * Remove a style from a material's styled representation.
     *
     * Removes empty IfcStyledItem, IfcStyledRepresentation, and
     * IfcMaterialDefinitionRepresentation entities, and propagates the removal to
     * matching shape aspects.
     *
     * @param file IFC file to modify.
     * @param material IfcMaterial entity.
     * @param style Presentation style entity to remove.
     * @param context IfcGeometricRepresentationContext identifying the styled representation.
     */
    unassignMaterialStyle(file: IfcOpenshellFile, material: IfcOpenshellInstance, style: IfcOpenshellInstance, context: IfcOpenshellInstance): void;
    /**
     * Remove styles from the geometric items within a shape representation.
     *
     * Removes matching styles from IfcStyledItem and
     * IfcPresentationStyleAssignment entities in the representation.
     *
     * @param file IFC file to modify.
     * @param shape_representation IfcShapeRepresentation to unassign styles from.
     * @param styles Presentation style entities to remove.
     * @param should_use_presentation_style_assignment Also search inside IfcPresentationStyleAssignment.
     */
    unassignRepresentationStyles(file: IfcOpenshellFile, shape_representation: IfcOpenshellInstance, styles: IfcOpenshellInstance[], should_use_presentation_style_assignment: boolean): void;
  }

  export interface IfcOpenshellSystemModule {
    /**
     * Create a new IfcDistributionPort and optionally assign it to an element.
     *
     * If an element is provided, the port is assigned to it via IfcRelNests
     * (IFC4+) or IfcRelConnectsPortToElement (IFC2X3).
     */
    addPort(file: IfcOpenshellFile, options: IfcOpenshellSystemAddPortOptions): IfcOpenshellInstance;
    /**
     * Create a new system with the given IFC class.
     *
     * In IFC2X3, "IfcDistributionSystem" is automatically resolved to "IfcSystem".
     * The system is created with Name set to "Unnamed".
     */
    addSystem(file: IfcOpenshellFile, options: IfcOpenshellSystemAddSystemOptions): IfcOpenshellInstance;
    /**
     * Assign a flow control element to a flow element via IfcRelFlowControlElements.
     *
     * If the flow control is already assigned to a different element, no change
     * is made and no relationship is returned.
     */
    assignFlowControl(file: IfcOpenshellFile, options: IfcOpenshellSystemAssignFlowControlOptions): IfcOpenshellInstance;
    /**
     * Assign a port to an element.
     *
     * In IFC2X3, uses IfcRelConnectsPortToElement. In IFC4+, uses IfcRelNests
     * to nest the port under the element. Updates the port's ObjectPlacement
     * if it has an IfcLocalPlacement.
     */
    assignPort(file: IfcOpenshellFile, options: IfcOpenshellSystemAssignPortOptions): IfcOpenshellInstance;
    /**
     * Assign products to a system via IfcRelAssignsToGroup.
     *
     * Validates that each product is compatible with the system type (e.g.
     * only IfcDistributionElement for IfcDistributionSystem). The operation fails
     * if a product is not valid for the system type.
     */
    assignSystem(file: IfcOpenshellFile, options: IfcOpenshellSystemAssignSystemOptions): IfcOpenshellInstance;
    /**
     * Connect two ports together with a given flow direction.
     *
     * Creates IfcRelConnectsPorts relationships and sets FlowDirection on both
     * ports. Existing connections to other ports are removed first. The
     * direction parameter controls which port is SOURCE, SINK, or both.
     */
    connectPort(file: IfcOpenshellFile, options: IfcOpenshellSystemConnectPortOptions): void;
    /**
     * Disconnect a port from all connected ports.
     *
     * Removes all IfcRelConnectsPorts relationships involving the port and
     * clears FlowDirection on both sides.
     */
    disconnectPort(file: IfcOpenshellFile, port: IfcOpenshellInstance): void;
    /** Edit an IfcSystem using the shared attribute property writer. */
    editSystem(file: IfcOpenshellFile, system: IfcOpenshellInstance, attributes: number): void;
    /**
     * Remove a system and its relationships.
     *
     * Removes associated IfcRelDefinesByProperties (property sets) and
     * IfcRelAssignsToGroup relationships, then deletes the system entity.
     */
    removeSystem(file: IfcOpenshellFile, system: IfcOpenshellInstance): void;
    /**
     * Remove a flow control element from a flow element's IfcRelFlowControlElements.
     *
     * If the control element is the only one in the relationship, the
     * relationship is deleted. Otherwise, the control element is removed from
     * the RelatedControlElements aggregate.
     */
    unassignFlowControl(file: IfcOpenshellFile, options: IfcOpenshellSystemUnassignFlowControlOptions): void;
    /**
     * Remove a port from an element.
     *
     * In IFC2X3, removes the IfcRelConnectsPortToElement. In IFC4+, removes
     * the port from the IfcRelNests relationship (or deletes the relationship
     * if it was the only nested object).
     */
    unassignPort(file: IfcOpenshellFile, options: IfcOpenshellSystemUnassignPortOptions): void;
    /** Remove products from a system. */
    unassignSystem(file: IfcOpenshellFile, options: IfcOpenshellSystemUnassignSystemOptions): void;
  }

  export interface IfcOpenshellTypeModule {
    /**
     * Assign a type to element occurrences via IfcRelDefinesByType.
     *
     * Objects previously typed by a different type are moved. If an existing
     * IfcRelDefinesByType relationship already relates to the same type,
     * objects are merged into it. When should_map_representations is true
     * (default), IfcRepresentationMaps from the type are propagated onto
     * each occurrence and PredefinedType/ObjectType are cleared to avoid
     * double-typing.
     */
    assignType(file: IfcOpenshellFile, options: IfcOpenshellTypeAssignTypeOptions): IfcOpenshellInstance;
    /**
     * Map IfcRepresentationMaps from a type onto a related object.
     *
     * Clones mapped representations from the type's RepresentationMaps and
     * assigns them to the object. Returns true if any representations were
     * mapped.
     */
    mapTypeRepresentations(file: IfcOpenshellFile, related_object: IfcOpenshellInstance, relating_type: IfcOpenshellInstance): boolean;
    /**
     * Remove type assignments from element occurrences.
     *
     * Removes objects from IfcRelDefinesByType relationships. If no objects
     * remain in a relationship, the relationship is deleted.
     */
    unassignType(file: IfcOpenshellFile, options: IfcOpenshellTypeUnassignTypeOptions): void;
  }

  export interface IfcOpenshellUnitModule {
    /**
     * Create an IfcContextDependentUnit entity.
     *
     * Creates a unit with custom dimensional exponents, unit type, and name.
     *
     * @param file File that receives the new entity.
     * @param unit_type IFC unit type enum value (e.g. "LENGTHUNIT").
     * @param name Display name for the unit (e.g. "bag", "each").
     * @param dimensions Dimensional exponents ordered as length, mass, time,
     * electric current, thermodynamic temperature, amount of substance, and
     * luminous intensity.
     * @return Newly created IfcContextDependentUnit.
     */
    addContextDependentUnit(file: IfcOpenshellFile, unit_type: string, name: string, dimensions: Dimensions7): IfcOpenshellInstance;
    /**
     * Create a conversion-based named unit from the native unit table.
     *
     * The operation creates dimensional exponents, the SI conversion target, an
     * IfcReal conversion value, and an IfcMeasureWithUnit. A nonzero effective
     * offset selects IfcConversionBasedUnitWithOffset when the schema provides it.
     */
    addConversionBasedUnit(file: IfcOpenshellFile, options: IfcOpenshellUnitAddConversionBasedUnitOptions): IfcOpenshellInstance;
    /**
     * Create an IfcDerivedUnit entity.
     *
     * Constructs a derived unit from semantic unit/exponent components (e.g.
     * m/s from [{metre, 1}, {second, -1}]).
     *
     * @param file File that receives the new entity.
     * @param options Unit type, optional user-defined type, and semantic components.
     * @return Newly created IfcDerivedUnit.
     */
    addDerivedUnit(file: IfcOpenshellFile, options: IfcOpenshellUnitAddDerivedUnitOptions): IfcOpenshellInstance;
    /**
     * Create an IfcMonetaryUnit entity.
     *
     * @param file File that receives the new entity.
     * @param currency ISO 4217 currency code (e.g. "USD", "EUR").
     * @return Newly created IfcMonetaryUnit.
     */
    addMonetaryUnit(file: IfcOpenshellFile, currency: string): IfcOpenshellInstance;
    /**
     * Create an IfcSIUnit entity.
     *
     * Sets the UnitType, Name (derived from the unit type), and optional
     * Prefix. When prefix is omitted, the Prefix attribute is left blank.
     *
     * @param file File that receives the new entity.
     * @param unit_type IFC unit type enum value (e.g. "LENGTHUNIT").
     * @param prefix SI prefix (e.g. "KILO", "MILLI"). When omitted, the base unit is used.
     * @return Newly created IfcSIUnit.
     */
    addSiUnit(file: IfcOpenshellFile, unit_type: string, prefix: string | null): IfcOpenshellInstance;
    /**
     * Assign explicit or convenience units to the first IfcProject.
     *
     * Reuses an existing IfcUnitAssignment, replaces assigned units with matching
     * UnitType (or the existing monetary unit), preserves unrelated units, and
     * returns the effective assignment. Replaced unit entities remain in the file.
     */
    assignUnit(file: IfcOpenshellFile, options: IfcOpenshellUnitAssignUnitOptions): IfcOpenshellInstance;
    /**
     * Calculate the scale factor from SI for a project unit type.
     *
     * Returns the multiplier needed to convert from the project's unit to SI
     * base units. For example, if the project length unit is millimetres,
     * returns 0.001. Defaults to 1.0 when no unit is found.
     *
     * @param file File to query for the project unit.
     * @param unit_type IFC unit type (e.g. "LENGTHUNIT"). Defaults to "LENGTHUNIT" when empty.
     * @return Scale factor to SI.
     */
    calculateUnitScale(file: IfcOpenshellFile, unit_type: string): number;
    /**
     * Convert a numeric value between units specified by prefix and name strings.
     *
     * Supports SI conversions and prefix-aware scaling. For example,
     * converting from ("KILO", "METRE") to ("", "METRE") multiplies by 1000.
     *
     * @param value Numeric value to convert.
     * @param from_prefix Source SI prefix (e.g. "KILO"). Empty for base unit.
     * @param from_unit Source unit name (e.g. "METRE", "GRAM").
     * @param to_prefix Target SI prefix.
     * @param to_unit Target unit name.
     * @return The converted value.
     */
    convert(value: number, from_prefix: string, from_unit: string, to_prefix: string, to_unit: string): number;
    /**
     * Convert a numeric value between two IFC unit entities.
     *
     * Reads the Prefix and Name attributes from each unit to perform the
     * conversion.
     *
     * @param value Numeric value to convert.
     * @param from_unit Source IfcUnit entity.
     * @param to_unit Target IfcUnit entity.
     * @return The converted value.
     */
    convertUnit(value: number, from_unit: IfcOpenshellInstance, to_unit: IfcOpenshellInstance): number;
    /** Edit an IfcDerivedUnit using the shared attribute property writer. */
    editDerivedUnit(file: IfcOpenshellFile, unit: IfcOpenshellInstance, attributes: number): void;
    /** Edit an IfcMonetaryUnit using the shared attribute property writer. */
    editMonetaryUnit(file: IfcOpenshellFile, unit: IfcOpenshellInstance, attributes: number): void;
    /**
     * Edit a named unit without owner-history or predefined-type synchronization.
     *
     * Shared dimensional exponents are copied before editing; uniquely owned
     * dimensions are mutated in place. Remaining attributes are applied in input
     * order after Dimensions has been handled.
     */
    editNamedUnit(file: IfcOpenshellFile, options: IfcOpenshellUnitEditNamedUnitOptions): void;
    /**
     * Format a length value as an imperial or metric string.
     *
     * For imperial output: returns feet-inches notation with fractional
     * precision (e.g. "5' - 3 1/4\""). For metric: returns a rounded
     * decimal value.
     *
     * @param value Length value to format.
     * @param precision Fractional precision denominator for imperial (e.g. 16 for 1/16").
     * @param decimal_places Number of decimal places for metric output.
     * @param suppress_zero_inches When true, omits zero inches in imperial output.
     * @param unit_system "imperial" or "metric".
     * @param input_unit Source unit: "foot" or "inch". Defaults to "foot" when empty.
     * @param output_unit Target unit: "foot" or "inch". Defaults to "foot" when empty.
     * @return Formatted length string.
     */
    formatLength(value: number, precision: number, decimal_places: number, suppress_zero_inches: boolean, unit_system: string, input_unit: string, output_unit: string): string;
    /**
     * Return the full name of an IfcSIUnit (prefix + name).
     *
     * For example, a unit with Prefix "KILO" and Name "METRE" returns
     * "KILOMETRE".
     *
     * @param unit IfcSIUnit entity.
     * @return Concatenated prefix and name string.
     */
    getFullUnitName(unit: IfcOpenshellInstance): string;
    /**
     * Derive the IFC measure class name from a unit type string.
     *
     * For example, "LENGTHUNIT" returns "IfcLengthMeasure",
     * "USERDEFINED" returns "IfcNumericMeasure". Returns an empty string
     * for unrecognised input.
     *
     * @param unit_type IFC unit type enum value (e.g. "LENGTHUNIT").
     * @return The corresponding IFC measure class name.
     */
    getMeasureClass(unit_type: string): string;
    /**
     * Derive the IFC unit type string from a measure class name.
     *
     * The inverse of unit_get_measure_class. For example,
     * "IfcLengthMeasure" returns "LENGTHUNIT".
     *
     * @param measure_class IFC measure class name.
     * @return The corresponding IFC unit type, or empty string if unrecognised.
     */
    getMeasureUnitType(measure_class: string): string;
    /**
     * Return the named dimensional exponents for a given unit type name.
     *
     * Like unit_get_si_dimensions but returns all zeros for unknown types
     * instead of falling back.
     *
     * @param name Unit type name.
     * @return 7-element sequence of dimensional exponents.
     */
    getNamedDimensions(name: string): Dimensions7;
    /**
     * Extract the SI prefix from a combined unit text string.
     *
     * For example, "KILOMETRE" returns "KILO", "MILLIGRAM" returns "MILLI".
     * Returns an empty string if no prefix is found.
     *
     * @param text Combined prefix and unit name string.
     * @return The prefix portion, or empty string if none.
     */
    getPrefix(text: string): string;
    /**
     * Return the numeric multiplier for an SI prefix.
     *
     * For example, "KILO" returns 1000.0, "MILLI" returns 0.001.
     * Returns 1.0 if no prefix is found.
     *
     * @param text SI prefix string (e.g. "KILO", "MILLI").
     * @return The multiplier value.
     */
    getPrefixMultiplier(text: string): number;
    /**
     * Return the project unit for a given unit type.
     *
     * Searches the project's IfcUnitAssignment for a unit whose UnitType
     * matches the given string.
     *
     * @param file File to query.
     * @param unit_type IFC unit type enum value (e.g. "LENGTHUNIT").
     * @return The matching unit entity, or no result if it is not found.
     */
    getProjectUnit(file: IfcOpenshellFile, unit_type: string): IfcOpenshellInstance;
    /**
     * Return the dimensional exponents for a given SI unit name.
     *
     * Returns a 7-element sequence of integers corresponding to the
     * IfcDimensionalExponents attributes: Length, Mass, Time,
     * ElectricCurrent, ThermodynamicTemperature, AmountOfSubstance,
     * LuminousIntensity. Falls back to the "OTHERWISE" entry for
     * unknown types.
     *
     * @param name SI unit name (e.g. "METRE", "GRAM").
     * @return 7-element sequence of dimensional exponents.
     */
    getSiDimensions(name: string): Dimensions7;
    /**
     * Infer the IFC measure class from a unit symbol string.
     *
     * For example, "m" returns "IfcLengthMeasure", "m2" returns "IfcAreaMeasure",
     * "kg" returns "IfcMassMeasure". Returns "IfcNumericMeasure" for unknown symbols.
     *
     * @param symbol Unit symbol (e.g. "m", "ft", "kg", "hr").
     * @return The corresponding IFC measure class name.
     */
    getSymbolMeasureClass(symbol: string): string;
    /**
     * Infer the IFC quantity class from a unit symbol string.
     *
     * For example, "m" returns "IfcQuantityLength", "m2" returns "IfcQuantityArea",
     * "kg" returns "IfcQuantityWeight". Returns "IfcQuantityCount" for unknown symbols.
     *
     * @param symbol Unit symbol (e.g. "m", "ft", "kg", "hr").
     * @return The corresponding IFC quantity class name.
     */
    getSymbolQuantityClass(symbol: string): string;
    /**
     * Return the IfcUnitAssignment entity for the project.
     *
     * @param file File to query.
     * @return The IfcUnitAssignment entity, or no result if it is not found.
     */
    getUnitAssignment(file: IfcOpenshellFile): IfcOpenshellInstance;
    /**
     * Extract the base unit name from a combined unit text string.
     *
     * Normalises "METER" to "METRE" before matching. For example,
     * "KILOMETRE" returns "METRE", "SQUARE_METRE" returns "SQUARE_METRE".
     * Returns an empty string if no unit name is found.
     *
     * @param text Combined prefix and unit name string.
     * @return The base unit name, or empty string if not recognised.
     */
    getUnitName(text: string): string;
    /**
     * Extract the base unit name, accepting both metric and imperial names.
     *
     * Like unit_get_unit_name but also recognises imperial unit names
     * (e.g. "FOOT", "INCH"). Returns an empty string if not recognised.
     *
     * @param text Unit name string.
     * @return The base unit name, or empty string if not recognised.
     */
    getUnitNameUniversal(text: string): string;
    /**
     * Return the display symbol for a unit entity.
     *
     * For IfcSIUnit: prefix symbol + unit symbol (e.g. "km").
     * For IfcContextDependentUnit with USERDEFINED UnitType: the Name attribute.
     * Returns "?" for unrecognised units.
     *
     * @param unit IfcUnit entity (IfcSIUnit, IfcContextDependentUnit, etc.).
     * @return Symbol string.
     */
    getUnitSymbol(unit: IfcOpenshellInstance): string;
    /**
     * Remove a unit entity from the file.
     *
     * Removes the unit from the project's IfcUnitAssignment (if present) and
     * then deletes the unit entity (and its dimensional exponents, if owned).
     *
     * @param file File containing the unit.
     * @param unit IfcUnit entity to remove.
     */
    removeUnit(file: IfcOpenshellFile, unit: IfcOpenshellInstance): void;
    /**
     * Resolve the IFC measure class for a property or quantity.
     *
     * Returns the measure class name (e.g. "IfcLengthMeasure") derived from
     * the property's NominalValue or quantity type. Returns an empty string
     * if a unit entity is directly attached (use unit_resolve_property_unit
     * instead).
     *
     * @param prop IfcProperty or IfcPhysicalQuantity entity.
     * @return Measure class name, or empty string if a unit entity is attached.
     */
    resolvePropertyMeasureClass(prop: IfcOpenshellInstance): string;
    /**
     * Resolve the defined measure class of an IfcPropertyTableValue.
     *
     * Returns the measure class name derived from the DefinedValues.
     * Returns an empty string if a DefinedUnit entity is directly attached.
     *
     * @param prop IfcPropertyTableValue entity.
     * @return Measure class name, or empty string if a unit entity is attached.
     */
    resolvePropertyTableDefinedMeasureClass(prop: IfcOpenshellInstance): string;
    /**
     * Resolve the defined unit of an IfcPropertyTableValue.
     *
     * Returns the DefinedUnit attribute, or no result if the unit must be
     * inferred from the DefinedValues measure class.
     *
     * @param prop IfcPropertyTableValue entity.
     * @return The DefinedUnit entity, or no result.
     */
    resolvePropertyTableDefinedUnit(prop: IfcOpenshellInstance): IfcOpenshellInstance;
    /**
     * Resolve the defining measure class of an IfcPropertyTableValue.
     *
     * Returns the measure class name derived from the DefiningValues.
     * Returns an empty string if a DefiningUnit entity is directly attached.
     *
     * @param prop IfcPropertyTableValue entity.
     * @return Measure class name, or empty string if a unit entity is attached.
     */
    resolvePropertyTableDefiningMeasureClass(prop: IfcOpenshellInstance): string;
    /**
     * Resolve the defining unit of an IfcPropertyTableValue.
     *
     * Returns the DefiningUnit attribute, or no result if the unit must be
     * inferred from the DefiningValues measure class.
     *
     * @param prop IfcPropertyTableValue entity.
     * @return The DefiningUnit entity, or no result.
     */
    resolvePropertyTableDefiningUnit(prop: IfcOpenshellInstance): IfcOpenshellInstance;
    /**
     * Resolve the unit entity attached to a property or quantity.
     *
     * Returns the Unit attribute directly attached to the property (for
     * IfcPropertySingleValue, IfcPhysicalSimpleQuantity, etc.). Returns no result
     * if the unit must be inferred from the measure class.
     *
     * @param prop IfcProperty or IfcPhysicalQuantity entity.
     * @return The attached IfcUnit, or no result if none is attached.
     */
    resolvePropertyUnit(prop: IfcOpenshellInstance): IfcOpenshellInstance;
    /**
     * Remove units from the project's IfcUnitAssignment.
     *
     * Removes the given units from the IfcUnitAssignment's Units aggregate.
     * If the aggregate becomes empty, the IfcUnitAssignment entity itself is
     * deleted. The unit entities are not deleted.
     *
     * @param file File containing the unit assignment.
     * @param units Units to unassign.
     */
    unassignUnit(file: IfcOpenshellFile, units: IfcOpenshellInstance[]): void;
  }

  export interface IfcOpenshellValueModule {
    /**
     * Extract a boolean from a selector value.
     *
     * @param value The selector value.
     * @return The boolean value, or false when no value is provided or the value is not boolean.
     */
    asBool(value: IfcOpenshellValue): boolean;
    /**
     * Extract a double from a selector value.
     *
     * @param value The selector value.
     * @return The double value, or 0.0 when no value is provided or the value is not a double.
     */
    asDouble(value: IfcOpenshellValue): number;
    /**
     * Extract an entity instance from a selector value.
     *
     * @param value The selector value.
     * @return The IFC entity, or no result when no value is provided or the value is not an entity.
     */
    asInstance(value: IfcOpenshellValue): IfcOpenshellInstance;
    /**
     * Extract a 64-bit integer from a selector value.
     *
     * @param value The selector value.
     * @return The integer value, or 0 when no value is provided or the value is not an integer.
     */
    asInt64(value: IfcOpenshellValue): bigint;
    /**
     * Extract a string from a selector value.
     *
     * @param value The selector value.
     * @return The string value, or an empty string when no value is provided or the value is not a string.
     */
    asString(value: IfcOpenshellValue): string;
    /**
     * Return the key at the given index in a mapping value.
     *
     * @param value The mapping value.
     * @param index Zero-based entry index.
     * @return The key string, or an empty string if the index is out of range or the value is not a mapping.
     */
    dictKeyAt(value: IfcOpenshellValue, index: number): string;
    /**
     * Set a key-value pair in a mapping value.
     *
     * @param dict The mapping value.
     * @param key The string key.
     * @param value The value to associate with the key. When omitted, assigns a no-value entry.
     * @return True if the key-value pair was set.
     */
    dictSet(dict: IfcOpenshellValue, key: string, value: IfcOpenshellValue | null): boolean;
    /**
     * Return the number of entries in a mapping value.
     *
     * @param value The selector value.
     * @return Number of entries, or 0 when no value is provided or the value is not a mapping.
     */
    dictSize(value: IfcOpenshellValue): number;
    /**
     * Return the value at the given index in a mapping value.
     *
     * @param value The mapping value.
     * @param index Zero-based entry index.
     * @return The value at the index, or no result if the index is out of range or the value is not a mapping.
     */
    dictValueAt(value: IfcOpenshellValue, index: number): IfcOpenshellValue | null;
    /**
     * Return the kind of a selector value.
     *
     * @param value The selector value.
     * @return The value kind, or the no-value kind when no value is provided.
     */
    kind(value: IfcOpenshellValue): number;
    /**
     * Append an item to a list value.
     *
     * @param list The list selector value.
     * @param item The item to append. When omitted, appends a no-value entry.
     * @return True if the item was appended.
     */
    listAppend(list: IfcOpenshellValue, item: IfcOpenshellValue | null): boolean;
    /**
     * Return an item from a list value at the given index.
     *
     * @param value The list value.
     * @param index Zero-based item index.
     * @return The item at the index, or no result if the index is out of range or the value is not a list.
     */
    listAt(value: IfcOpenshellValue, index: number): IfcOpenshellValue | null;
    /**
     * Return the number of items in a list value.
     *
     * @param value The selector value.
     * @return Number of items, or 0 when no value is provided or the value is not a list.
     */
    listSize(value: IfcOpenshellValue): number;
    /**
     * Create a boolean value.
     *
     * @param value The boolean value.
     * @return New boolean selector value. Release it with value_free.
     */
    newBool(value: boolean): IfcOpenshellValue | null;
    /**
     * Create an empty mapping value.
     *
     * @return New mapping selector value. Release it with value_free.
     */
    newDict(): IfcOpenshellValue | null;
    /**
     * Create a double-precision floating-point value.
     *
     * @param value The double value.
     * @return New double selector value. Release it with value_free.
     */
    newDouble(value: number): IfcOpenshellValue | null;
    /**
     * Create an instance (entity reference) value.
     *
     * When value is omitted, creates a value representing no value.
     *
     * @param value The IFC entity instance.
     * @return New entity-reference selector value. Release it with value_free.
     */
    newInstance(value: IfcOpenshellInstance | null): IfcOpenshellValue | null;
    /**
     * Create a 64-bit integer value.
     *
     * @param value The integer value.
     * @return New integer selector value. Release it with value_free.
     */
    newInt(value: bigint): IfcOpenshellValue | null;
    /**
     * Create an empty list value.
     *
     * @return New list selector value. Release it with value_free.
     */
    newList(): IfcOpenshellValue | null;
    /**
     * Create a value representing no value.
     *
     * @return New selector value representing no value. Release it with value_free.
     */
    newNone(): IfcOpenshellValue | null;
    /**
     * Create a string value.
     *
     * @param value The string value.
     * @return New string selector value. Release it with value_free.
     */
    newString(value: string): IfcOpenshellValue | null;
  }

  export interface IfcOpenshellModule {
    IfcOpenshellAggregationType: typeof IfcOpenshellAggregationType;
    IfcOpenshellAttribute: typeof IfcOpenshellAttribute;
    IfcOpenshellDeclaration: typeof IfcOpenshellDeclaration;
    IfcOpenshellEntity: typeof IfcOpenshellEntity;
    IfcOpenshellEnumeration: typeof IfcOpenshellEnumeration;
    IfcOpenshellFileDescription: typeof IfcOpenshellFileDescription;
    IfcOpenshellFileName: typeof IfcOpenshellFileName;
    IfcOpenshellFileSchema: typeof IfcOpenshellFileSchema;
    IfcOpenshellFile: typeof IfcOpenshellFile;
    IfcOpenshellGeomBrepElement: typeof IfcOpenshellGeomBrepElement;
    IfcOpenshellGeomBrepRepresentation: typeof IfcOpenshellGeomBrepRepresentation;
    IfcOpenshellGeomBuffer: typeof IfcOpenshellGeomBuffer;
    IfcOpenshellGeomConversionResultShape: typeof IfcOpenshellGeomConversionResultShape;
    IfcOpenshellGeomElement: typeof IfcOpenshellGeomElement;
    IfcOpenshellGeomFunctionItemEvaluator: typeof IfcOpenshellGeomFunctionItemEvaluator;
    IfcOpenshellGeomGeometrySerializer: typeof IfcOpenshellGeomGeometrySerializer;
    IfcOpenshellGeomIterator: typeof IfcOpenshellGeomIterator;
    IfcOpenshellGeomOpaqueNumber: typeof IfcOpenshellGeomOpaqueNumber;
    IfcOpenshellGeomSerialization: typeof IfcOpenshellGeomSerialization;
    IfcOpenshellGeomSerializedElement: typeof IfcOpenshellGeomSerializedElement;
    IfcOpenshellGeomSerializerSettings: typeof IfcOpenshellGeomSerializerSettings;
    IfcOpenshellGeomSerializer: typeof IfcOpenshellGeomSerializer;
    IfcOpenshellGeomSettings: typeof IfcOpenshellGeomSettings;
    IfcOpenshellGeomSvgfillPolygon: typeof IfcOpenshellGeomSvgfillPolygon;
    IfcOpenshellGeomTaxonomyBooleanResult: typeof IfcOpenshellGeomTaxonomyBooleanResult;
    IfcOpenshellGeomTaxonomyBsplineCurve: typeof IfcOpenshellGeomTaxonomyBsplineCurve;
    IfcOpenshellGeomTaxonomyBsplineSurface: typeof IfcOpenshellGeomTaxonomyBsplineSurface;
    IfcOpenshellGeomTaxonomyCircle: typeof IfcOpenshellGeomTaxonomyCircle;
    IfcOpenshellGeomTaxonomyCollection: typeof IfcOpenshellGeomTaxonomyCollection;
    IfcOpenshellGeomTaxonomyColour: typeof IfcOpenshellGeomTaxonomyColour;
    IfcOpenshellGeomTaxonomyCylinder: typeof IfcOpenshellGeomTaxonomyCylinder;
    IfcOpenshellGeomTaxonomyDirection3: typeof IfcOpenshellGeomTaxonomyDirection3;
    IfcOpenshellGeomTaxonomyEdge: typeof IfcOpenshellGeomTaxonomyEdge;
    IfcOpenshellGeomTaxonomyEllipse: typeof IfcOpenshellGeomTaxonomyEllipse;
    IfcOpenshellGeomTaxonomyExtrusion: typeof IfcOpenshellGeomTaxonomyExtrusion;
    IfcOpenshellGeomTaxonomyFace: typeof IfcOpenshellGeomTaxonomyFace;
    IfcOpenshellGeomTaxonomyItem: typeof IfcOpenshellGeomTaxonomyItem;
    IfcOpenshellGeomTaxonomyLine: typeof IfcOpenshellGeomTaxonomyLine;
    IfcOpenshellGeomTaxonomyLoft: typeof IfcOpenshellGeomTaxonomyLoft;
    IfcOpenshellGeomTaxonomyLoop: typeof IfcOpenshellGeomTaxonomyLoop;
    IfcOpenshellGeomTaxonomyMatrix4: typeof IfcOpenshellGeomTaxonomyMatrix4;
    IfcOpenshellGeomTaxonomyNode: typeof IfcOpenshellGeomTaxonomyNode;
    IfcOpenshellGeomTaxonomyOffsetCurve: typeof IfcOpenshellGeomTaxonomyOffsetCurve;
    IfcOpenshellGeomTaxonomyPlane: typeof IfcOpenshellGeomTaxonomyPlane;
    IfcOpenshellGeomTaxonomyPoint3: typeof IfcOpenshellGeomTaxonomyPoint3;
    IfcOpenshellGeomTaxonomyRevolve: typeof IfcOpenshellGeomTaxonomyRevolve;
    IfcOpenshellGeomTaxonomyShell: typeof IfcOpenshellGeomTaxonomyShell;
    IfcOpenshellGeomTaxonomySolid: typeof IfcOpenshellGeomTaxonomySolid;
    IfcOpenshellGeomTaxonomySphere: typeof IfcOpenshellGeomTaxonomySphere;
    IfcOpenshellGeomTaxonomyStyle: typeof IfcOpenshellGeomTaxonomyStyle;
    IfcOpenshellGeomTaxonomySweepAlongCurve: typeof IfcOpenshellGeomTaxonomySweepAlongCurve;
    IfcOpenshellGeomTaxonomyTorus: typeof IfcOpenshellGeomTaxonomyTorus;
    IfcOpenshellGeomTransformation: typeof IfcOpenshellGeomTransformation;
    IfcOpenshellGeomTreeClashList: typeof IfcOpenshellGeomTreeClashList;
    IfcOpenshellGeomTreeClash: typeof IfcOpenshellGeomTreeClash;
    IfcOpenshellGeomTreeRayIntersectionList: typeof IfcOpenshellGeomTreeRayIntersectionList;
    IfcOpenshellGeomTreeRayIntersection: typeof IfcOpenshellGeomTreeRayIntersection;
    IfcOpenshellGeomTree: typeof IfcOpenshellGeomTree;
    IfcOpenshellGeomTriangulationElement: typeof IfcOpenshellGeomTriangulationElement;
    IfcOpenshellGeomTriangulation: typeof IfcOpenshellGeomTriangulation;
    IfcOpenshellHeader: typeof IfcOpenshellHeader;
    IfcOpenshellInstanceStreamer: typeof IfcOpenshellInstanceStreamer;
    IfcOpenshellInstance: typeof IfcOpenshellInstance;
    IfcOpenshellInverseAttribute: typeof IfcOpenshellInverseAttribute;
    IfcOpenshellNamedType: typeof IfcOpenshellNamedType;
    IfcOpenshellParameterType: typeof IfcOpenshellParameterType;
    IfcOpenshellParseAttributeValue: typeof IfcOpenshellParseAttributeValue;
    IfcOpenshellParseInstanceList: typeof IfcOpenshellParseInstanceList;
    IfcOpenshellProjectAppendAssetCache: typeof IfcOpenshellProjectAppendAssetCache;
    IfcOpenshellPsetTemplateHandle: typeof IfcOpenshellPsetTemplateHandle;
    IfcOpenshellSchema: typeof IfcOpenshellSchema;
    IfcOpenshellSelectType: typeof IfcOpenshellSelectType;
    IfcOpenshellSimpleType: typeof IfcOpenshellSimpleType;
    IfcOpenshellTypeDeclaration: typeof IfcOpenshellTypeDeclaration;
    IfcOpenshellValue: typeof IfcOpenshellValue;
    aggregate: IfcOpenshellAggregateModule;
    alignment: IfcOpenshellAlignmentModule;
    attribute: IfcOpenshellAttributeModule;
    boundary: IfcOpenshellBoundaryModule;
    classification: IfcOpenshellClassificationModule;
    cogo: IfcOpenshellCogoModule;
    compute: IfcOpenshellComputeModule;
    constraint: IfcOpenshellConstraintModule;
    context: IfcOpenshellContextModule;
    control: IfcOpenshellControlModule;
    cost: IfcOpenshellCostModule;
    document: IfcOpenshellDocumentModule;
    drawing: IfcOpenshellDrawingModule;
    element: IfcOpenshellElementModule;
    entity: IfcOpenshellEntityModule;
    feature: IfcOpenshellFeatureModule;
    geom: IfcOpenshellGeomModule;
    geometry: IfcOpenshellGeometryModule;
    georeference: IfcOpenshellGeoreferenceModule;
    grid: IfcOpenshellGridModule;
    group: IfcOpenshellGroupModule;
    guid: IfcOpenshellGuidModule;
    layer: IfcOpenshellLayerModule;
    library: IfcOpenshellLibraryModule;
    material: IfcOpenshellMaterialModule;
    nest: IfcOpenshellNestModule;
    owner: IfcOpenshellOwnerModule;
    parse: IfcOpenshellParseModule;
    placement: IfcOpenshellPlacementModule;
    profile: IfcOpenshellProfileModule;
    project: IfcOpenshellProjectModule;
    pset: IfcOpenshellPsetModule;
    pset_template: IfcOpenshellPsetTemplateModule;
    register: IfcOpenshellRegisterModule;
    representation: IfcOpenshellRepresentationModule;
    resource: IfcOpenshellResourceModule;
    root: IfcOpenshellRootModule;
    schema: IfcOpenshellSchemaModule;
    selector: IfcOpenshellSelectorModule;
    sequence: IfcOpenshellSequenceModule;
    shape: IfcOpenshellShapeModule;
    shape_builder: IfcOpenshellShapeBuilderModule;
    spatial: IfcOpenshellSpatialModule;
    structural: IfcOpenshellStructuralModule;
    style: IfcOpenshellStyleModule;
    system: IfcOpenshellSystemModule;
    type: IfcOpenshellTypeModule;
    unit: IfcOpenshellUnitModule;
    value: IfcOpenshellValueModule;
    loadPlugin(kind: 'schema' | 'kernel' | 'mapping' | 'tree' | 'document' | 'geometry_serializer', id: string): Promise<void>;
    loadedPlugins(): string[];
  }

  export function createIfcOpenshellModule(
    initModule: (options?: Record<string, IfcOpenshellRawValue>) => Promise<object>,
    wasmUrl?: string,
    options?: {
      pluginBaseUrl?: string;
      pluginManifest?: Record<string, Record<string, { wasm: string; depends?: string[] }>>;
      pluginLoader?: (
        url: string,
        plugin: { kind: string; id: string; entry: { wasm: string; depends?: string[] } },
      ) => Promise<Uint8Array | ArrayBuffer | ArrayBufferView> | Uint8Array | ArrayBuffer | ArrayBufferView;
    },
  ): Promise<IfcOpenshellModule>;
}
