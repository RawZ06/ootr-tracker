export type AppError =
  | { type: 'json_parse'; title: string; message: string }
  | { type: 'json_corrupt'; title: string; message: string }
  | { type: 'checksum_mismatch'; title: string; message: string }
  | { type: 'pathfinding_timeout'; title: string; message: string }
  | { type: 'file_upload'; title: string; message: string };
