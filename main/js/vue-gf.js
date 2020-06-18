Vue.use(VeeValidate, {
  locale: 'ja',
  events: 'input|blur|focus'
});

Vue.component('listitem', {
  props: ['item','index'],
  inject: ['$validator'], //Validetaionを共有
  data: function () {
    return {
      PulldownInitialMessage: '選択してください',
      inputvalue: this.item.initialvalue ? this.item.initialvalue : null,
      inputvalues: Array.isArray(this.item.options) ? [] : false
    }
  },
  computed: {
    options_with_freeanswer: function() {
      var options = this.item.options
      if(this.item.freeanswer && Array.isArray(options)) {
        return options.concat(['__other_option__'])
      } else if(!Array.isArray(options)){
        return [options]
      } else {
        return options
      }
    }
  },
  methods: {
    check: function(id){
      var target = document.getElementById(id);
      if(!target.checked) target.click() // IDのclick
    },
    focus: function(textid, checkboxid) {
      if(!checkboxid || document.getElementById(checkboxid).checked) {
        document.getElementById(textid).focus()
      }
    }
  },
  template: /*html*/`
  <div class="form-group" :class="{'has-error': errors.has('entry.'+item.name) || errors.has('entry.'+item.name+'.other_option_response')}">
    <template v-if="item.questiontype === 'text'">
      <input
      class="form-input"
      type="text"
      :area-label="item.question"
      :id="'entry.'+item.name" :name="'entry.'+item.name" :data-vv-as="item.question"
      v-model="inputvalue"
      v-validate="item.validate === true ? 'required' : item.validate"
      :placeholder="item.placeholder">
    </template>
    <template v-else-if="item.questiontype === 'textarea'">
      <textarea
      class="form-input textmsg"
      :id="'entry.'+item.name" :name="'entry.'+item.name" :data-vv-as="item.question"
      v-model="inputvalue"
      v-validate="item.validate === true ? 'required' : item.validate"
      :placeholder="item.placeholder">
      </textarea>
    </template>
    <p v-if="errors.has('entry.'+item.name) || errors.has('entry.'+item.name+'.other_option_response')"" class="form-input-hint">
      <template v-if="errors.has('entry.'+item.name)">{{ errors.first('entry.'+item.name) }}</template>
      <template v-else>{{ errors.first('entry.'+item.name+'.other_option_response') }}</template>
    </p>
  </div>`
});

var app = new Vue({
  el: '#app',
  data: {
    formdata: {},
    submitted: false
  },
  methods: {
    gf_submit: function() {
      this.$validator.validate().then(result => {
        if (!result) {
          return false;
        }
        document.gf_form.submit();
        this.submitted = true;
      });
    }
  },
  mounted: function() {
    var iframe = document.createElement("iframe");
    iframe.setAttribute('name','hidden_iframe');
    iframe.setAttribute('style','display: none');
    document.body.appendChild(iframe);
  }
});