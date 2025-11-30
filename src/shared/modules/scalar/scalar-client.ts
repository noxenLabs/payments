import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';
import { EnvValues } from '@shared/environment/config/env-values.config';
import { RelativePathEnums } from '@shared/environment/paths-enums';
import { ReadFile, TransformTo64 } from '@shared/utils/FileUtils';
import { ScalarOptions } from './scalar-constants';

export class ScalarClient {
  register(app: INestApplication) {
    const document = SwaggerModule.createDocument(app, GenerateDocumentBuilder());
    const prefix = EnvValues.get().GLOBAL_PREFIX;
    // Normalizar el prefijo: eliminar slashes al inicio y final
    const normalizedPrefix = prefix.replace(/^\/+|\/+$/g, '');
    
    const processedDocument = {
      ...document,
      paths: Object.entries(document.paths).reduce((acc, [path, methods]) => {
        if (path.includes('/Health')) {
          acc[path] = methods;
        } else {
          // Construir la ruta correctamente sin doble slash
          const newPath = `/${normalizedPrefix}${path}`;
          acc[newPath] = methods;
        }
        return acc;
      }, {})
    };

    app.use(
      ScalarOptions.path,
      apiReference({
        spec: {
          content: processedDocument,
        },
        customCss: ReadFile(RelativePathEnums.SCALAR_PATH, 'flytheme.css'),
        favicon: TransformTo64(RelativePathEnums.SCALAR_PATH, 'favicon.ico')
      }),
    );


    app.use(`${ScalarOptions.path}.json`, (_, res: any) => {
      res.setHeader('Content-Type', 'application/json');
      res.send(document);
    });
  }
}

const GenerateDocumentBuilder = () => {
  return new DocumentBuilder()
    .setTitle(ScalarOptions.title)
    .setDescription(ScalarOptions.description)
    .setVersion(ScalarOptions.version)
    .build();
};