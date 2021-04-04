export default {
  blog: {
    post: [
      { id: 'fc1582e2-853e-48c8-9da2-990557b37583' },
      { id: 'aaac83b6-90b0-49a2-9086-9ea3a23450bc' },
    ],

    postLc: [
      {
        id: '50c64e48-bf12-483f-b6e5-944a0fc9983c',
        postId: 'fc1582e2-853e-48c8-9da2-990557b3758',
        langTag: 'ar',
        slug: 'ميّزات كِنت',
        title: 'ميّزات كِنت',

        body: `و سأعرض مثال حي لهذا، من منا لم يتحمل جهد بدني شاق إلا من أجل
        الحصول على ميزة أو فائدة؟ ولكن من لديه الحق أن ينتقد شخص ما أراد أن يشعر
        بالسعادة التي لا تشوبها عواقب أليمة أو آخر أراد أن يتجنب الألم الذي ربما
        تنجم عنه بعض المتعة ؟`,

        summary: `و سأعرض مثال حي لهذا، من منا لم يتحمل جهد بدني شاق إلا من أجل
        الحصول على ميزة أو فائدة؟ ولكن من لديه الحق أن ينتقد شخص ما أراد أن يشعر
        بالسعادة`,
      },
      {
        id: '7627b286-8d8a-41d2-ac08-79e352d7f40a',
        postId: 'fc1582e2-853e-48c8-9da2-990557b3758',
        langTag: 'en',
        slug: 'smart-language-tag-selection-with-qint',
        title: 'Smart Language Tag Selection with Qint',

        body: `
<div id="outline-container-org9e663a6" class="outline-2">
<div class="outline-text-2" id="text-1">
<p>
On initial application load, a language tag is selected. You might wonder how is
the language tag chosen? Qint prioritizes a language tag &ldquo;URL prefix&rdquo; if it
exists (for example <code>/en/blog</code>), if not, it looks for a previously set &ldquo;cookie&rdquo;,
if no cookie is found, it falls back to the default language tag set in your
Qint configuration.
</p>

<p>
Note that the use of the URL prefix or the cookie is optional.
</p>

<p>
A language tag selection can also be triggered in other ways, for example when
changing to a route in a different language tag.
</p>

<p>
Whenever a language tag selection is triggered, few things happen:
</p>

<ul class="org-ul">
<li>The vue-i18n messages corresponding to the new language tag are loaded, and the locale of vue-i18n instance is changed to the new language tag.</li>
<li>The corresponding Quasar language pack is loaded and set for the app.</li>
<li>The language tag cookie is set or updated with the new language tag.</li>
</ul>

<p>
Qint also provides a smart language selector component. When a translation for
the current page exists in the target language tag, the selector switches to it,
otherwise, it will switch to the home page of the target language tag.
</p>
</div>
</div>
`,

        summary: `<p>
On initial application load, a language tag is selected. You might wonder how is
the language tag chosen? Qint prioritizes a language tag &ldquo;URL prefix&rdquo; if it
exists (for example <code>/en/blog</code>), if not, it looks for a previously set &ldquo;cookie&rdquo;,
if no cookie is found, it falls back to the default language tag set in your
Qint configuration.
</p>`,
      },
      {
        id: 'bfc2450e-6e61-429b-9957-263b1d3c41d5',
        postId: 'aaac83b6-90b0-49a2-9086-9ea3a23450bc',
        langTag: 'ar',
        slug: 'دليل الإعداد السريع',
        title: 'دليل الإعداد السريع',

        body: `علي الجانب الآخر نشجب ونستنكر هؤلاء الرجال المفتونون بنشوة اللحظة
        الهائمون في رغباتهم فلا يدركون ما يعقبها من الألم والأسي المحتم، واللوم
        كذلك يشمل هؤلاء الذين أخفقوا في واجباتهم نتيجة لضعف إرادتهم فيتساوي مع
        هؤلاء الذين يتجنبون وينأون عن تحمل الكدح والألم .`,

        summary: `علي الجانب الآخر نشجب ونستنكر هؤلاء الرجال المفتونون بنشوة اللحظة
        الهائمون في رغباتهم فلا يدركون ما يعقبها من الألم والأسي المحتم،`,
      },
      {
        id: 'c830466a-3a0f-4a87-a91a-8ed34f02c3e9',
        postId: 'aaac83b6-90b0-49a2-9086-9ea3a23450bc',
        langTag: 'en',
        slug: 'quick-start-guide',
        title: 'Quick start guide',

        body: `Aenean quis est et sem euismod molestie. Ut auctor dui vitae nibh
        sodales venenatis. Suspendisse potenti. Suspendisse consectetur, nisi
        non faucibus bibendum, arcu nibh vestibulum leo, sed consectetur orci
        felis ac odio. Suspendisse et mi vel lorem dignissim euismod. Integer
        eget lobortis mauris. Curabitur porta id ligula sit amet auctor.
        Curabitur scelerisque, nunc vel aliquet tincidunt, mi dui molestie arcu,
        in facilisis elit felis sit amet dolor. Donec mi risus, semper eget
        rutrum non, consequat et dolor. In a massa at odio gravida volutpat.
        Aliquam ultrices elementum elit, malesuada porta mi varius nec. Donec a
        aliquam urna, sed vulputate tortor.`,

        summary: `Aenean quis est et sem euismod molestie. Ut auctor dui vitae nibh
        sodales venenatis. Suspendisse potenti. Suspendisse consectetur, nisi
        non faucibus bibendum, arcu nibh vestibulum leo, sed consectetur orci
        felis ac odio.`,
      },
    ],
  },
}
