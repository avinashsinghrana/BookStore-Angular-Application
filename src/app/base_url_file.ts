export class BaseURLFile {
  public static FRONTEND_PORT = '4200';
  public static BACKEND_PORT = '8087';
  public static AWS_SERVER = 'http://13.126.219.29:' + BaseURLFile.BACKEND_PORT + '/';
  public static AZURE_SERVER = 'http://20.127.89.43:' + BaseURLFile.BACKEND_PORT + '/';
  public static LOCAL_SERVER = 'http://localhost:' + BaseURLFile.BACKEND_PORT + '/';

  public static AWS_ROUTE_PAGE = 'http://13.126.219.29:' + BaseURLFile.FRONTEND_PORT + '/';
  public static AZURE_ROUTE_PAGE = 'http://20.127.89.43:' + BaseURLFile.FRONTEND_PORT + '/';
  public static lOCAL_ROUTE_PAGE = 'http://localhost:' + BaseURLFile.FRONTEND_PORT + '/';

  public static ACTIVE_SERVER = BaseURLFile.LOCAL_SERVER;
  public static ACTIVE_ROUTER = BaseURLFile.LOCAL_SERVER;
}
