
```js
// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'vue-zoomer',
      fileName: 'my-lib',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
```

entry: kaynak dosyası index.html olmadığı sürece bu alan zorunludur ve projemizin kaynak dosyasını belirtir.
name: Paketmizin indirildikten sonra hangi isim ile kullanılacağını belirtir.formats kısmı `umd` veya `iife` içeriyorsa zorunludur.
formats: ['es','cjs','umd','iife'] olabilir.Default olarak değer ['es','cjs'] tir.
fileName: Çıktıdaki dosya isimlerini belirtir.Fonksiyon veya string ile tanımlamayı yapabiliriz.
```js
    {
        formats:['es','cjs'],
        fileName:'my-package'
    }
```
  olarak tanımlarsak çıktı dosyaları  `my-package.js` ve 'my-package.cjs' olarak oluşturulur.

```js
    {
        formats:['es','cjs'],
      fileName: (format) => {
        const ext = format == 'es' ? 'js' : 'cjs';
        return `${format}.${ext}`
      },    }
```
 olarak tanımlarsak ise çıktı dosyaları es.js ve cjs.cjs olarak isimlendirilir.
 

##Rollup
### Bundle
Pek çok dosyadan oluşan kodun tek bir dosyada birleştirilmesi işlemine bundle denir.Bundle işlemi sayesinde  kullanılmayan kodlar silinir,kod miktarı azalır böylece performans muazzam şekilde artar.Yazılım dilleri genellikle bundle özelliği ile beraber gelmez.
Geliştiriciler tarafından bundle araçları oluşturulur ve bu araçlar ile bundle işlemi gerçekleştirilir.Günümüzde en çok kullanılan bundle teknolojileri Rollup ve Webpacktir.Webpack daha eski ve daha popüler olmasına rağmen modern bir çözüm ve kod miktarını muazzam bir şekilde küçülttüğü için rollup kullanacağız.

Three Shaking: Kullanılmayan kodu eleme işlemine three shaking denir.ES6(export-import) ile yazılan projelerde tree shaking özelliği default olarak desteklenirken CommonJs ile yapılan projelerde ekstra işlemler yapılmasına rağmen tamamıyla three shaking işlemi başarılı olması beklenmez çünkü ES6 static bir yapı sağlarken CommonJs çalışma zamanında(compile time) modülleri ekler.



Rollup Core Özellikler:
- external: [packageName | RegExp] : Çıktı dosyasına dahil edilmeyecek bağımlılıkları belirtmek için kullanılır.Bağımlılık isimleri import edilirken nasıl yazılıyorsa burda da öyle yazılmalıdır.Mesela Vue projesinde Vue bağımlılığını son çıktıda bulunmaması gereklidir ve Vue js kullanırken mesela .`import {ref} from "vue"` şeklinde kullanırız yani id miz "vue" kelimesidir.Bunun için `external:['vue']` şeklinde yazılmalıdır.
-  output.globals: {[id :string]:string} : İçerde kullanılan harici paketlerin hangi değişken adı ile kullanıldığını belirtir.External paket kullanıldıysa tanımlamak zorunludur. Mesela 
  ```js
  import _ from 'lodash';

    const result = _.add(5, 10);
    console.log(result);
  ```
   bunun gibi bir kullanımda
   ```js
   output:{
    globals:{
        "lodash":'_'
    }
   }
   şeklinde tanımlanmalıdır.
   ```

Package.json configurasyonu
name: Oluşturulan paketin adını belirttiğimiz alandır,  Name özelliği npm(Node Package Manager) ecosysteminde unique olmalıdıdır.
version: Oluşturulan paketin güncel versiyonunu temsil eder.Versiyon ataması yapılırken Semantic Versioning Specification(Semver)'e göre yapılması tavsiye edilir.Semver Özet olarak aşağıdaki kurallara sahiptir.
1. Versiyon x.y.z şeklinde 3 bölümden oluşur.X: Major değişikliklerde,Y Minör değişikliklerde,Z ise hata düzeltmelerinde değiştirilmelidir.Bazen pre-release durumunda olduğunu ifade etmek için x.y.z-alpha gibi suffixler eklenebilir.
2. Her kısım arttırıldığında sağında bulunan kısımların sıfırlanması gereklidir.Mesela 1.4.2 deki versiyonun X kısmını değiştirmek istersek 2.0.0 olarak güncellenmelidir.
3. Bir paket test aşamasında olduğu süre boyunca X kısmı 0 olmalıdır.Public API olarak kullanılmaya başlanacağı zaman X kısmı 1 den başlanarak paket çıkartılır.
  

Semver hakkında daha fazla bilgi almak için kendi dökümanına buraya tıklayarak gidebilirsiniz.[x](https://semver.org/#semantic-versioning-specification-semver)

description: Paketin açıklamasını yapmamız gereken bölümdür
keywoards: Paket keywoardlarını içeren bölüm.
homepage: projemizin bulunduğu adresi temsil eder.Proje sayfası veya github sayfası olabilir.
license: Hangi lisansa sahip olduğumuzu belirtir.Open source projeler için genellikle MIT tercih edilir.
files: Hangi dosyaların projemizde olduğunu belirten alandır.Default olarak ['*'] değerindedir yani tüm dosyaları içerir(ignore edilmiş dosyalar hariç).
Tüm dosyalar yerine sadece belli dosyaları almasını istersek düzenlemeliyiz ['dist','Readme.md','*.css'] gibi .
main: Projenin kök klasörünü temsil eder.Herhangi bir değer belirtilmezse "index.js" değerini alır.
funding: Sponsorlar bilgilerinin bulunduğu sayfanın linkini alır.
exports: Hangi dosyanın dışarıya hangi isimle import edileceğini belirtir.Tüm dosyaların relative path ile yapılması gerekir ve "./" ile roottan başlamalıdır.
```js
"exports":{
  "*":{
    "types":"./dist/index.d.ts",
    "import":"./dist/index.js",
    "require":"./dist/index.cjs"
  },
  "./style":"./dist/main.css"
}
```

import: es ile kullanılırken "./dist/index.js" ,require ile import ederken(CommonJs) "./dist/index.cjs" kullanılır.Typescript projelerinde types seçeneğini de import eder.
import style from "my-package/style" seçeneği "./dist/main.css" dosyasını import eder.

sideEffects: Bundle aşamasında three shaking kullanılıp kullanılmaması gerektiğini belirtir.Three shaking uygulanmasını istersek false olarak ayarlamalıyız.


repository: Paketin nerede bulunduğunu belirtmek için kullanılır.Aşağıda örneği verilmiştir.
  "repository": {
    "type": "git",
    "url": "https://github.com/unocss/unocss",
    "directory": "packages/vite"
  },
