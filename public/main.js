(() => {
  "use strict";
  class t {
    constructor() {
      return this.fonts()
    } fonts() {
      let t = [];
      return t.push(new Promise((t => {
        t(document.fonts.ready)
      }))), t
    }
  } class e {
    constructor() {
      this.focusHandler = this.focusHandler.bind(this), this.menuOpen = !1, this.button = document.querySelector("button.navigation__button"), this.button.addEventListener("click", this.toggleMenu.bind(this)), this.menuItems = document.querySelector("ul.navigation__list"), this.firstFocusable = this.button, this.lastFocusable = this.menuItems.querySelectorAll("a")[2], this.homeLink = document.querySelector("nav .navigation__link"), this.main = document.querySelector("main"), this.footer = document.querySelector("footer")
    } toggleMenu() {
      this.menuOpen = !this.menuOpen, this.menuOpen ? (this.button.classList.add("open"), this.button.setAttribute("aria-expanded", !0), this.button.textContent = "Close Global Menu", this.menuItems.classList.add("open"), window.addEventListener("keydown", this.focusHandler), this.homeLink.setAttribute("aria-hidden", !0), this.main.setAttribute("aria-hidden", !0), this.footer.setAttribute("aria-hidden", !0)) : (this.button.classList.remove("open"), this.button.setAttribute("aria-expanded", !1), this.button.textContent = "Open Global Menu", this.menuItems.classList.remove("open"), window.removeEventListener("keydown", this.focusHandler), this.homeLink.setAttribute("aria-hidden", !1), this.main.setAttribute("aria-hidden", !1), this.footer.setAttribute("aria-hidden", !1))
    } focusHandler(t) {
      9 === t.keyCode && (t.shiftKey && document.activeElement === this.firstFocusable ? (t.preventDefault(), this.lastFocusable.focus()) : t.shiftKey || document.activeElement !== this.lastFocusable || (t.preventDefault(), this.firstFocusable.focus()))
    }
  } class s {
    constructor() {
      this.isActive = !1, this.enterThreshold = 0, this.exitThreshold = 0, this.metrics = {
      }, this.animations = [], this.persistentAnimation = !1
    } setDOM(t) {
      this.DOM = document.querySelector(t)
    } addAnimation(t) {
      this.animations.push(t)
    } enable() {
      this.isActive = !0, this.DOM.classList.add("active")
    } disable() {
      this.isActive = !1, this.DOM.classList.remove("active"), this.animations.forEach((t => {
        t.renderer && t.renderer.gl.clear(t.renderer.gl.COLOR_BUFFER_BIT | t.renderer.gl.DEPTH_BUFFER_BIT), t.ctx && t.ctx.clearRect(0, 0, t.canvas.width, t.canvas.height)
      }))
    } onPreloaded() {
      this.animations.forEach((t => {
        t.onPreloaded && t.onPreloaded()
      }))
    } onDestroy() {
      this.animations.forEach((t => {
        t.onDestroy && t.onDestroy()
      })), this.animations = []
    } onScroll(t) {
      t.y >= this.metrics.scrollY + this.enterThreshold && t.y < this.metrics.scrollY + this.metrics.height + this.exitThreshold ? this.isActive || this.onEnter() : this.isActive && this.onExit(), this.animations.forEach((e => {
        e.onScroll && e.onScroll(t)
      }))
    } onResize(t) {
      this.viewport = t, this.animations.forEach((e => {
        e.onResize && e.onResize(t)
      })), this.metrics.scrollX = this.DOM.offsetLeft, this.metrics.scrollY = this.DOM.offsetTop, this.metrics.width = this.DOM.clientWidth, this.metrics.height = this.DOM.clientHeight
    } onMouseDown(t) {
      this.isActive && this.animations.forEach((e => {
        e.onMouseDown && e.onMouseDown(t)
      }))
    } onMouseUp(t) {
      this.isActive && this.animations.forEach((e => {
        e.onMouseUp && e.onMouseUp(t)
      }))
    } onEnter() {
      this.isActive || this.enable()
    } onExit() {
      this.isActive && this.disable()
    } onUpdate(t) {
      this.isActive && this.animations.forEach((e => {
        e.onUpdate && e.onUpdate(t)
      }))
    }
  } class i {
    static cross(t, e) {
      return [t[1] * e[2] - t[2] * e[1], t[2] * e[0] - t[0] * e[2], t[0] * e[1] - t[1] * e[0]]
    } static subtract(t, e) {
      return [t[0] - e[0], t[1] - e[1], t[2] - e[2]]
    } static normalize(t) {
      const e = Math.sqrt(t[0] ** 2 + t[1] ** 2 + t[2] ** 2);
      return e > 1e-5 ? [t[0] / e, t[1] / e, t[2] / e] : [0, 0, 0]
    }
  } class o {
    static multiply(t, e) {
      const s = e[0], i = e[1], o = e[2], n = e[3], r = e[4], a = e[5], h = e[6], c = e[7], l = e[8], u = e[9], d = e[10], p = e[11], m = e[12], g = e[13], f = e[14], v = e[15], x = t[0], w = t[1], y = t[2], M = t[3], T = t[4], P = t[5], E = t[6], b = t[7], S = t[8], R = t[9], I = t[10], _ = t[11], z = t[12], A = t[13], O = t[14], D = t[15];
      return [s * x + i * T + o * S + n * z, s * w + i * P + o * R + n * A, s * y + i * E + o * I + n * O, s * M + i * b + o * _ + n * D, r * x + a * T + h * S + c * z, r * w + a * P + h * R + c * A, r * y + a * E + h * I + c * O, r * M + a * b + h * _ + c * D, l * x + u * T + d * S + p * z, l * w + u * P + d * R + p * A, l * y + u * E + d * I + p * O, l * M + u * b + d * _ + p * D, m * x + g * T + f * S + v * z, m * w + g * P + f * R + v * A, m * y + g * E + f * I + v * O, m * M + g * b + f * _ + v * D]
    } static identity() {
      return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
    } static inverse(t) {
      const e = new Float32Array(16), s = t[0], i = t[1], o = t[2], n = t[3], r = t[4], a = t[5], h = t[6], c = t[7], l = t[8], u = t[9], d = t[10], p = t[11], m = t[12], g = t[13], f = t[14], v = t[15], x = d * v, w = f * p, y = h * v, M = f * c, T = h * p, P = d * c, E = o * v, b = f * n, S = o * p, R = d * n, I = o * c, _ = h * n, z = l * g, A = m * u, O = r * g, D = m * a, L = r * u, C = l * a, F = s * g, U = m * i, N = s * u, k = l * i, Y = s * a, H = r * i, B = x * a + M * u + T * g - (w * a + y * u + P * g), q = w * i + E * u + R * g - (x * i + b * u + S * g), V = y * i + b * a + I * g - (M * i + E * a + _ * g), G = P * i + S * a + _ * u - (T * i + R * a + I * u), X = 1 / (s * B + r * q + l * V + m * G);
      return e[0] = X * B, e[1] = X * q, e[2] = X * V, e[3] = X * G, e[4] = X * (w * r + y * l + P * m - (x * r + M * l + T * m)), e[5] = X * (x * s + b * l + S * m - (w * s + E * l + R * m)), e[6] = X * (M * s + E * r + _ * m - (y * s + b * r + I * m)), e[7] = X * (T * s + R * r + I * l - (P * s + S * r + _ * l)), e[8] = X * (z * c + D * p + L * v - (A * c + O * p + C * v)), e[9] = X * (A * n + F * p + k * v - (z * n + U * p + N * v)), e[10] = X * (O * n + U * c + Y * v - (D * n + F * c + H * v)), e[11] = X * (C * n + N * c + H * p - (L * n + k * c + Y * p)), e[12] = X * (O * d + C * f + A * h - (L * f + z * h + D * d)), e[13] = X * (N * f + z * o + U * d - (F * d + k * f + A * o)), e[14] = X * (F * h + H * f + D * o - (Y * f + O * o + U * h)), e[15] = X * (Y * d + L * o + k * h - (N * h + H * d + C * o)), e
    } static transpose(t) {
      return [t[0], t[4], t[8], t[12], t[1], t[5], t[9], t[13], t[2], t[6], t[10], t[14], t[3], t[7], t[11], t[15]]
    } static translate(t, e, s) {
      return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, t, e, s, 1]
    } static rotateX(t) {
      const e = t * Math.PI / 180, s = Math.cos(e), i = Math.sin(e);
      return [1, 0, 0, 0, 0, s, i, 0, 0, -i, s, 0, 0, 0, 0, 1]
    } static rotateY(t) {
      const e = t * Math.PI / 180, s = Math.cos(e), i = Math.sin(e);
      return [s, 0, -i, 0, 0, 1, 0, 0, i, 0, s, 0, 0, 0, 0, 1]
    } static rotateZ(t) {
      const e = t * Math.PI / 180, s = Math.cos(e), i = Math.sin(e);
      return [s, i, 0, 0, -i, s, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
    } static scale(t, e, s) {
      return [t, 0, 0, 0, 0, e, 0, 0, 0, 0, s, 0, 0, 0, 0, 1]
    } static lookAt(t, e) {
      const s = i.normalize(i.subtract(t, e)), o = i.normalize(i.cross([0, 1, 0], s)), n = i.normalize(i.cross(s, o));
      return [o[0], o[1], o[2], 0, n[0], n[1], n[2], 0, s[0], s[1], s[2], 0, t[0], t[1], t[2], 1]
    }
  } let n = 0;
  class r {
    constructor(t) {
      this.id = n++, this.attributes = {
      }, this.setAttribute("aPosition", new Float32Array(t), 3), this._generateNormals(t)
    } setAttribute(t, e, s) {
      this.attributes[t] = {
        name: t, data: e, size: s, count: e.length / s
      }
    } _generateNormals(t) {
      const e = [];
      for (var s = 0;
        s < t.length;
        s += 3) {
        const i = t[s], o = t[s + 1], n = t[s + 2], r = Math.sqrt(i ** 2 + o ** 2 + n ** 2);
        e.push(i / r, o / r, n / r)
      } this.setAttribute("aNormal", new Float32Array(e), 3)
    }
  } let a = 0;
  let h = 0;
  class c {
    static createColor(t, e, s) {
      return {
        r: t / 255, g: e / 255, b: s / 255
      }
    }
  } c.Renderer = class {
    constructor(t) {
      this.gl = t.getContext("webgl", {
        powerPreference: "high-performance"
      }), this.resize = this.resize.bind(this), this.render = this.render.bind(this), this.depthTest = !0, this.faceCulling = !0, this.pixelRatio = Math.min(window.devicePixelRatio, 2), this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, !0), this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT, 1), this.framebuffer = null
    } setPixelRatio(t) {
      this.pixelRatio = t
    } setFrameBuffer(t) {
      this.framebuffer = null !== t ? t.buffer : null
    } resize() {
      const t = this.gl.canvas.clientWidth * this.pixelRatio, e = this.gl.canvas.clientHeight * this.pixelRatio;
      return !(this.gl.canvas.width * this.pixelRatio === t && this.gl.canvas.height * this.pixelRatio === e) && (this.gl.canvas.width = t, this.gl.canvas.height = e, this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height), !0)
    } render(t, e) {
      this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.framebuffer), this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT), this.faceCulling && this.gl.enable(this.gl.CULL_FACE), this.depthTest && this.gl.enable(this.gl.DEPTH_TEST), this.gl.enable(this.gl.BLEND), this.gl.blendEquation(this.gl.FUNC_ADD), this.gl.blendFunc(this.gl.ONE_MINUS_CONSTANT_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
      let s = null, i = null;
      e.setViewProjectionMatrix();
      for (const o of t.objects) {
        o.setProjectionMatrix(e.viewProjectionMatrix);
        let t = !1;
        if (o.shader.program !== s && (this.gl.useProgram(o.shader.program), s = o.shader.program, t = !0), t || o.attributes != i) {
          for (const t in o.attributes) {
            this.gl.enableVertexAttribArray(o.attributes[t].location), this.gl.bindBuffer(this.gl.ARRAY_BUFFER, o.attributes[t].buffer);
            const e = o.attributes[t].size, s = this.gl.FLOAT, i = !1, n = 0, r = 0;
            this.gl.vertexAttribPointer(o.attributes[t].location, e, s, i, n, r)
          } i = o.attributes
        } for (const t in o.uniforms) if ("uViewProjectionMatrix" === t) this.gl.uniformMatrix4fv(o.uniforms[t].location, !1, o.projectionMatrix);
        else if ("uNormalMatrix" === t) this.gl.uniformMatrix4fv(o.uniforms[t].location, !1, o.normalMatrix);
        else if ("uLocalMatrix" === t) this.gl.uniformMatrix4fv(o.uniforms[t].location, !1, o.localMatrix);
        else switch (o.uniforms[t].type) {
          case "1f": this.gl.uniform1f(o.uniforms[t].location, o.uniforms[t].value);
            break;
          case "2f": this.gl.uniform2f(o.uniforms[t].location, o.uniforms[t].value[0], o.uniforms[t].value[1]);
            break;
          case "3f": this.gl.uniform3f(o.uniforms[t].location, o.uniforms[t].value[0], o.uniforms[t].value[1], o.uniforms[t].value[2]);
            break;
          case "4f": this.gl.uniform4f(o.uniforms[t].location, o.uniforms[t].value[0], o.uniforms[t].value[1], o.uniforms[t].value[2], o.uniforms[t].value[3]);
            break;
          case "mat3": this.gl.uniformMatrix3fv(o.uniforms[t].location, !1, o.uniforms[t].value);
            break;
          case "mat4": this.gl.uniformMatrix4fv(o.uniforms[t].location, !1, o.uniforms[t].value);
            break;
          case "tex": this.gl.uniform1i(o.uniforms[t].location, o.uniforms[t].value.id), this.gl.activeTexture(this.gl.TEXTURE0 + o.uniforms[t].value.id), this.gl.bindTexture(this.gl.TEXTURE_2D, o.uniforms[t].value.texture)
        }const n = this.gl[o.drawMode], r = 0, a = o.attributes.aPosition.count;
        this.gl.drawArrays(n, r, a)
      }
    }
  }, c.Orthographic = class {
    constructor(t, e, s, i, n, r) {
      this.left = t, this.right = e, this.bottom = s, this.top = i, this.near = n, this.far = r, this.type = "orthographic", this.position = {
        x: 0, y: 0, z: 0
      }, this.rotation = {
        x: 0, y: 0, z: 0
      }, this.viewMatrix = o.identity(), this.createMatrix()
    } createMatrix() {
      this.matrix = [2 / (this.right - this.left), 0, 0, 0, 0, 2 / (this.top - this.bottom), 0, 0, 0, 0, -2 / (this.far - this.near), 0, -(this.right + this.left) / (this.right - this.left), -(this.top + this.bottom) / (this.top - this.bottom), -(this.far + this.near) / (this.far - this.near), 1]
    } _recalculateViewMatrix() {
      const t = o.identity(), e = o.translate(this.position.x, this.position.y, this.position.z), s = o.rotateX(this.rotation.x), i = o.rotateY(this.rotation.y), n = o.rotateZ(this.rotation.z);
      let r = o.multiply(t, e);
      r = o.multiply(r, s), r = o.multiply(r, i), r = o.multiply(r, n), this.lookAtEnabled && (r = o.lookAt([r[12], r[13], r[14]], [this.lookAtTarget.localMatrix[12], this.lookAtTarget.localMatrix[13], this.lookAtTarget.localMatrix[14]])), this.viewMatrix = o.inverse(r)
    } setViewProjectionMatrix() {
      this._recalculateViewMatrix(), this.viewProjectionMatrix = o.multiply(this.matrix, this.viewMatrix)
    } setLeft(t) {
      this.left = t, this.createMatrix()
    } setRight(t) {
      this.right = t, this.createMatrix()
    } setBottom(t) {
      this.bottom = t, this.createMatrix()
    } setTop(t) {
      this.top = t, this.createMatrix()
    } setNear(t) {
      this.near = t, this.createMatrix()
    } setFar(t) {
      this.far = t, this.createMatrix()
    } setPosition(t, e, s) {
      this.position = {
        x: t, y: e, z: s
      }
    } setRotationX(t) {
      this.rotation.x = t
    } setRotationY(t) {
      this.rotation.y = t
    } setRotationZ(t) {
      this.rotation.z = t
    } lookAt(t) {
      this.lookAtEnabled = !0, this.lookAtTarget = t
    }
  }, c.Perspective = class {
    constructor(t, e, s, i) {
      this.fieldOfView = t * Math.PI / 180, this.aspectRatio = e, this.near = s, this.far = i, this.type = "perspective", this.position = {
        x: 0, y: 0, z: 0
      }, this.rotation = {
        x: 0, y: 0, z: 0
      }, this.viewMatrix = o.identity(), this.lookAtEnabled = !1, this.createMatrix()
    } createMatrix() {
      this.top = this.near * Math.tan(this.fieldOfView / 2), this.bottom = -this.top, this.right = this.top * this.aspectRatio, this.left = -this.right, this.matrix = [2 * this.near / (this.right - this.left), 0, 0, 0, 0, 2 * this.near / (this.top - this.bottom), 0, 0, 0, 0, -(this.far + this.near) / (this.far - this.near), -1, -this.near * (this.right + this.left) / (this.right - this.left), -this.near * (this.top + this.bottom) / (this.top - this.bottom), 2 * this.far * this.near / (this.near - this.far), 0]
    } _recalculateViewMatrix() {
      const t = o.identity(), e = o.translate(this.position.x, this.position.y, this.position.z), s = o.rotateX(this.rotation.x), i = o.rotateY(this.rotation.y), n = o.rotateZ(this.rotation.z);
      let r = o.multiply(t, e);
      r = o.multiply(r, s), r = o.multiply(r, i), r = o.multiply(r, n), this.lookAtEnabled && (r = o.lookAt([r[12], r[13], r[14]], [this.lookAtTarget.localMatrix[12], this.lookAtTarget.localMatrix[13], this.lookAtTarget.localMatrix[14]])), this.viewMatrix = o.inverse(r)
    } setViewProjectionMatrix() {
      this._recalculateViewMatrix(), this.viewProjectionMatrix = o.multiply(this.matrix, this.viewMatrix)
    } setFieldOfView(t) {
      this.fieldOfView = t * Math.PI / 180, this.createMatrix()
    } setAspectRatio(t) {
      this.aspectRatio = t, this.createMatrix()
    } setNear(t) {
      this.near = t, this.createMatrix()
    } setFar(t) {
      this.far = t, this.createMatrix()
    } setPosition(t, e, s) {
      this.position = {
        x: t, y: e, z: s
      }
    } setRotationX(t) {
      this.rotation.x = t
    } setRotationY(t) {
      this.rotation.y = t
    } setRotationZ(t) {
      this.rotation.z = t
    } lookAt(t) {
      this.lookAtEnabled = !0, this.lookAtTarget = t
    }
  }, c.Volume = class {
    constructor() {
      this.objects = []
    } add(t) {
      this.objects.push(t), this.objects.sort(((t, e) => {
        const s = t.geometryID - e.geometryID;
        return s || t.shader.id - e.shader.id
      }))
    }
  }, c.Collection = class {
    constructor() {
      this.items = [], this.position = {
        x: 0, y: 0, z: 0
      }, this.rotation = {
        x: 0, y: 0, z: 0
      }, this.scale = {
        x: 1, y: 1, z: 1
      }, this.localMatrix = o.identity()
    } _recalculateModelMatrix() {
      const t = o.identity(), e = o.translate(this.position.x, this.position.y, this.position.z), s = o.rotateX(this.rotation.x), i = o.rotateY(this.rotation.y), n = o.rotateZ(this.rotation.z), r = o.scale(this.scale.x, this.scale.y, this.scale.z);
      let a = o.multiply(t, e);
      a = o.multiply(a, s), a = o.multiply(a, i), a = o.multiply(a, n), a = o.multiply(a, r), this.localMatrix = a
    } setProjectionMatrix(t) {
      this._recalculateModelMatrix(), this.projectionMatrix = t
    } setPosition(t, e, s) {
      this.position = {
        x: t, y: e, z: s
      }, this._recalculateModelMatrix()
    } setRotationX(t) {
      this.rotation.x = t, this._recalculateModelMatrix()
    } setRotationY(t) {
      this.rotation.y = t, this._recalculateModelMatrix()
    } setRotationZ(t) {
      this.rotation.z = t, this._recalculateModelMatrix()
    } setScale(t, e, s) {
      this.scale = {
        x: t, y: e, z: s
      }, this._recalculateModelMatrix()
    }
  }, c.Mesh = class {
    constructor(t, e) {
      this.geometryID = t.id, this.geometryType = t.type, this.shader = e, this.position = {
        x: 0, y: 0, z: 0
      }, this.rotation = {
        x: 0, y: 0, z: 0
      }, this.scale = {
        x: 1, y: 1, z: 1
      }, this.attributes = t.attributes, this.uniforms = {
        uViewProjectionMatrix: {
          name: "uViewProjectionMatrix", value: null, type: "mat4"
        }, uNormalMatrix: {
          name: "uNormalMatrix", value: null, type: "mat4"
        }, uLocalMatrix: {
          name: "uLocalMatrix", value: null, type: "mat4"
        }
      }, this.surfaceNormals = !1, this.localMatrix = o.identity(), this._setAttributeData(), this._setUniformData(), this._setDrawMode(), this._setSurfaceNormals()
    } _setAttributeData() {
      for (const t in this.attributes) this.attributes[t].location = this.shader.gl.getAttribLocation(this.shader.program, this.attributes[t].name), this.attributes[t].buffer = this.shader.gl.createBuffer(), this.shader.gl.bindBuffer(this.shader.gl.ARRAY_BUFFER, this.attributes[t].buffer), this.shader.gl.bufferData(this.shader.gl.ARRAY_BUFFER, this.attributes[t].data, this.shader.gl.STATIC_DRAW)
    } _setUniformData() {
      for (const t in this.uniforms) this.uniforms[t].location = this.shader.gl.getUniformLocation(this.shader.program, this.uniforms[t].name)
    } _setDrawMode() {
      this.geometryType ? this.drawMode = this.geometryType : this.drawMode = "TRIANGLES"
    } _setSurfaceNormals() {
      if (this.surfaceNormals) {
        const t = [];
        for (let e = 0;
          e < this.geometry.attributes.aNormal.data.length;
          e += 9) {
          const s = [this.geometry.attributes.aNormal.data[e], this.geometry.attributes.aNormal.data[e + 1], this.geometry.attributes.aNormal.data[e + 2]], o = [this.geometry.attributes.aNormal.data[e + 3], this.geometry.attributes.aNormal.data[e + 4], this.geometry.attributes.aNormal.data[e + 5]], n = [this.geometry.attributes.aNormal.data[e + 6], this.geometry.attributes.aNormal.data[e + 7], this.geometry.attributes.aNormal.data[e + 8]], r = i.subtract(o, s), a = i.subtract(n, s), h = r[1] * a[2] - r[2] * a[1], c = r[2] * a[0] - r[0] * a[2], l = r[0] * a[1] - r[1] * a[0], u = i.normalize([h, c, l]);
          t.push(u[0], u[1], u[2]), t.push(u[0], u[1], u[2]), t.push(u[0], u[1], u[2])
        } this.shader.gl.bindBuffer(this.shader.gl.ARRAY_BUFFER, this.geometry.attributes.aNormal.buffer), this.shader.gl.bufferData(this.shader.gl.ARRAY_BUFFER, new Float32Array(t), this.shader.gl.STATIC_DRAW)
      }
    } _recalculateModelMatrix() {
      const t = o.identity(), e = o.translate(this.position.x, this.position.y, this.position.z), s = o.rotateX(this.rotation.x), i = o.rotateY(this.rotation.y), n = o.rotateZ(this.rotation.z), r = o.scale(this.scale.x, this.scale.y, this.scale.z);
      let a = o.multiply(t, e);
      a = o.multiply(a, s), a = o.multiply(a, i), a = o.multiply(a, n), a = o.multiply(a, r), this.parentCollection ? this.localMatrix = o.multiply(this.parentCollection.localMatrix, a) : this.localMatrix = a
    } _recalculateNormalMatrix() {
      this.normalMatrix = o.transpose(o.inverse(this.localMatrix))
    } setProjectionMatrix(t) {
      this._recalculateModelMatrix(), this._recalculateNormalMatrix(), this.projectionMatrix = t
    } setPosition(t, e, s) {
      this.position = {
        x: t, y: e, z: s
      }, this._recalculateModelMatrix()
    } setRotationX(t) {
      this.rotation.x = t, this._recalculateModelMatrix()
    } setRotationY(t) {
      this.rotation.y = t, this._recalculateModelMatrix()
    } setRotationZ(t) {
      this.rotation.z = t, this._recalculateModelMatrix()
    } setScale(t, e, s) {
      this.scale = {
        x: t, y: e, z: s
      }, this._recalculateModelMatrix()
    } setAttribute(t, e, s) {
      this.attributes[t] = {
        name: t, data: e, size: s, count: e.length / s
      }, this._setAttributeData()
    } setUniform(t, e, s) {
      this.uniforms[t] = {
        name: t, value: e, type: s
      }, this._setUniformData()
    } setShader(t) {
      this.shader = t, this._setAttributeData(), this._setUniformData()
    } setParent(t) {
      if (this.parentCollection) {
        let t = this.parentCollection.items.indexOf(this);
        t >= 0 && this.parentCollection.items.splice(t, 1)
      } t && t.items.push(this), this.parentCollection = t
    }
  }, c.Geometry = r, c.Plane = class extends r {
    constructor(t, e, s, i) {
      const o = [], n = t / s, r = e / i;
      for (let a = 0;
        a < i;
        a++)for (let i = 0;
          i < s;
          i++) {
          const s = i * n - t / 2, h = a * r - e / 2, c = 0, l = (i + 1) * n - t / 2, u = h, d = s, p = (a + 1) * r - e / 2, m = s, g = p, f = l, v = u, x = l, w = p;
          o.push(s, h, c, l, u, c, d, p, c, m, g, c, f, v, c, x, w, c)
        } super(o);
      const a = [];
      for (var h = 0;
        h < o.length;
        h += 3) {
        const t = o[h], e = o[h + 1], s = 1, i = Math.sqrt(t ** 2 + e ** 2 + s ** 2);
        a.push(t / i, e / i, 1)
      } this.attributes.aNormal.data = new Float32Array(a), this.attributes.aNormal.count = a.length / 3;
      const c = [];
      for (let s = 0;
        s < o.length;
        s += 3) {
        const i = (o[s] + t / 2) / t, n = (o[s + 1] + e / 2) / e;
        c.push(i, n)
      } this.setAttribute("aUV", new Float32Array(c), 2)
    }
  }, c.Circle = class extends r {
    constructor(t, e) {
      const s = [];
      s.push(0, 0, 0);
      for (let i = 0;
        i < e;
        i++) {
        const o = Math.cos(i * Math.PI / (e / 2)) * t, n = Math.sin(i * Math.PI / (e / 2)) * t, r = 0;
        s.push(o, n, r)
      } s.push(Math.cos(0) * t, Math.sin(0) * t, 0), super(s);
      const i = [];
      for (var o = 0;
        o < s.length;
        o += 3) {
        const t = s[o], e = s[o + 1], n = 1, r = Math.sqrt(t ** 2 + e ** 2 + n ** 2);
        i.push(t / r, e / r, n / r)
      } this.attributes.aNormal.data = new Float32Array(i), this.attributes.aNormal.count = i.length / 3;
      const n = [];
      for (let e = 0;
        e < s.length;
        e += 3) {
        const i = (s[e] + t) / (2 * t), o = (s[e + 1] + t) / (2 * t);
        n.push(i, o)
      } this.setAttribute("aUV", new Float32Array(n), 2), this.type = "TRIANGLE_FAN"
    }
  }, c.Tetrahedron = class extends r {
    constructor(t) {
      const e = [];
      Math.sqrt(3);
      e.push(-t / 2, -t * Math.sqrt(3) / 6, t * Math.sqrt(3) / 6, t / 2, -t * Math.sqrt(3) / 6, t * Math.sqrt(3) / 6, 0, t * Math.sqrt(3) / 3, 0, t / 2, -t * Math.sqrt(3) / 6, t * Math.sqrt(3) / 6, 0, -t * Math.sqrt(3) / 6, -t * Math.sqrt(3) / 3, 0, t * Math.sqrt(3) / 3, 0, 0, -t * Math.sqrt(3) / 6, -t * Math.sqrt(3) / 3, -t / 2, -t * Math.sqrt(3) / 6, t * Math.sqrt(3) / 6, 0, t * Math.sqrt(3) / 3, 0, -t / 2, -t * Math.sqrt(3) / 6, t * Math.sqrt(3) / 6, 0, -t * Math.sqrt(3) / 6, -t * Math.sqrt(3) / 3, t / 2, -t * Math.sqrt(3) / 6, t * Math.sqrt(3) / 6), super(e);
      const s = [];
      for (let t = 0;
        t < e.length;
        t += 9)27 === t ? s.push(1, (1 - Math.sqrt(.75)) / 2, .5, (1 - Math.sqrt(.75)) / 2 + Math.sqrt(.75), 0, (1 - Math.sqrt(.75)) / 2) : s.push(0, (1 - Math.sqrt(.75)) / 2, 1, (1 - Math.sqrt(.75)) / 2, .5, (1 - Math.sqrt(.75)) / 2 + Math.sqrt(.75));
      this.setAttribute("aUV", new Float32Array(s), 2)
    }
  }, c.Cube = class extends r {
    constructor(t, e, s, i, o, n) {
      const r = [], a = [];
      function h(t, e, s, i, o, n, h, c, l, u, d) {
        const p = i / h, m = o / c, g = n / 2;
        for (let n = 0;
          n < c;
          n++)for (let c = 0;
            c < h;
            c++) {
            const h = {
            };
            h[t] = [], h[e] = [], h[s] = [];
            const f = c * p - i / 2, v = n * m - o / 2, x = (c + 1) * p - i / 2, w = (n + 1) * m - o / 2;
            "front" === l ? (h[t].push(f), h[e].push(v), h[s].push(g), h[t].push(x), h[e].push(v), h[s].push(g), h[t].push(f), h[e].push(w), h[s].push(g), h[t].push(f), h[e].push(w), h[s].push(g), h[t].push(x), h[e].push(v), h[s].push(g), h[t].push(x), h[e].push(w), h[s].push(g)) : "back" === l && (h[t].push(x), h[e].push(v), h[s].push(g), h[t].push(f), h[e].push(v), h[s].push(g), h[t].push(x), h[e].push(w), h[s].push(g), h[t].push(x), h[e].push(w), h[s].push(g), h[t].push(f), h[e].push(v), h[s].push(g), h[t].push(f), h[e].push(w), h[s].push(g)), r.push(h.x[0], h.y[0], h.z[0], h.x[1], h.y[1], h.z[1], h.x[2], h.y[2], h.z[2], h.x[3], h.y[3], h.z[3], h.x[4], h.y[4], h.z[4], h.x[5], h.y[5], h.z[5]);
            for (let s = 0;
              s < 6;
              s++) {
              let n, r;
              n = u ? 1 - (h[t][s] + i / 2) / i : (h[t][s] + i / 2) / i, r = d ? 1 - (h[e][s] + o / 2) / o : (h[e][s] + o / 2) / o, a.push(n, r)
            }
          }
      } h("x", "y", "z", t, e, s, i, o, "front", !1, !1), h("x", "y", "z", t, e, -s, i, o, "back", !0, !1), h("x", "z", "y", t, s, e, i, n, "back", !1, !0), h("x", "z", "y", t, s, -e, i, n, "front", !1, !1), h("z", "y", "x", s, e, t, n, o, "back", !0, !1), h("z", "y", "x", s, e, -t, n, o, "front", !1, !1), super(r), this.setAttribute("aUV", new Float32Array(a), 2)
    }
  }, c.Sphere = class extends r {
    constructor(t, e) {
      const s = [], i = [], o = 2 * Math.PI / e;
      for (let i = 0;
        i < e;
        i++)for (let n = 0;
          n < e;
          n++) {
          const e = t * Math.cos(n * o) * Math.sin(i * o), r = t * Math.cos(i * o), a = t * Math.sin(n * o) * Math.sin(i * o), h = t * Math.cos(n * o) * Math.sin((i + 1) * o), c = t * Math.cos((i + 1) * o), l = t * Math.sin(n * o) * Math.sin((i + 1) * o), u = t * Math.cos((n + 1) * o) * Math.sin((i + 1) * o), d = t * Math.cos((i + 1) * o), p = t * Math.sin((n + 1) * o) * Math.sin((i + 1) * o), m = e, g = r, f = a, v = u, x = d, w = p, y = t * Math.cos((n + 1) * o) * Math.sin(i * o), M = t * Math.cos(i * o), T = t * Math.sin((n + 1) * o) * Math.sin(i * o);
          s.push(e, r, a, h, c, l, u, d, p, m, g, f, v, x, w, y, M, T)
        } super(s);
      for (let t = 0;
        t < this.attributes.aNormal.data.length;
        t += 3) {
        let e = 0;
        -1 == this.attributes.aNormal.data[t + 1] && this.attributes.aNormal.data[t] >= 0 ? e = -.5 : -1 == this.attributes.aNormal.data[t + 1] && this.attributes.aNormal.data[t] < 0 && (e = .5);
        const s = .5 + Math.atan2(this.attributes.aNormal.data[t], this.attributes.aNormal.data[t + 2]) / (2 * Math.PI), o = .5 - Math.asin(this.attributes.aNormal.data[t + 1]) / Math.PI;
        i.push(s + e, 1 - o)
      } const n = 12 * e, r = n / 4 * 3;
      for (let t = 0;
        t < i.length;
        t += n)0 !== t && (i[t - r] = 1, i[t - (r - 2)] = 1, i[t - (r - 6)] = 1);
      i[i.length - r] = 1, i[i.length - (r - 2)] = 1, i[i.length - (r - 6)] = 1, this.setAttribute("aUV", new Float32Array(i), 2)
    }
  }, c.Cylinder = class extends r {
    constructor(t, e, s) {
      const i = [];
      for (let o = 0;
        o < s;
        o++) {
        i.push(0, 0, e / 2);
        const n = Math.cos(o * Math.PI / (s / 2)) * t, r = Math.sin(o * Math.PI / (s / 2)) * t, a = e / 2;
        i.push(n, r, a);
        const h = Math.cos((o + 1) * Math.PI / (s / 2)) * t, c = Math.sin((o + 1) * Math.PI / (s / 2)) * t, l = e / 2;
        i.push(h, c, l)
      } for (let o = 0;
        o < s;
        o++) {
        i.push(0, 0, -e / 2);
        const n = Math.cos(o * Math.PI / (s / 2)) * t, r = Math.sin(o * Math.PI / (s / 2)) * t, a = -e / 2;
        i.push(n, r, a);
        const h = Math.cos((o + 1) * Math.PI / (s / 2)) * t, c = Math.sin((o + 1) * Math.PI / (s / 2)) * t, l = -e / 2;
        i.push(h, c, l)
      } for (let o = 0;
        o < s;
        o++) {
        const n = Math.cos(o * Math.PI / (s / 2)) * t, r = Math.sin(o * Math.PI / (s / 2)) * t, a = e / 2;
        i.push(n, r, a);
        const h = Math.cos((o + 1) * Math.PI / (s / 2)) * t, c = Math.sin((o + 1) * Math.PI / (s / 2)) * t;
        i.push(h, c, a);
        const l = -e / 2;
        i.push(n, r, l), i.push(h, c, l), i.push(n, r, l), i.push(h, c, a)
      } super(i);
      const o = [];
      for (var n = 0;
        n < i.length;
        n += 3) {
        const t = i[n], e = i[n + 1], s = i[n + 2] > 0 ? 1 : -1, r = Math.sqrt(t ** 2 + e ** 2 + s ** 2);
        o.push(t / r, e / r, s / r)
      } this.attributes.aNormal.data = new Float32Array(o), this.attributes.aNormal.count = o.length / 3;
      const r = [];
      for (let e = 0;
        e < i.length;
        e += 3) {
        const s = (i[e] + t) / (2 * t), o = (i[e + 1] + t) / (2 * t);
        r.push(s, o)
      } this.setAttribute("aUV", new Float32Array(r), 2)
    }
  }, c.Program = class {
    constructor(t, e, s) {
      const i = this._createShader(t, t.VERTEX_SHADER, e), o = this._createShader(t, t.FRAGMENT_SHADER, s);
      this.gl = t, this.id = a++, this.program = this._createProgram(t, i, o)
    } _createShader(t, e, s) {
      const i = t.createShader(e);
      t.shaderSource(i, s), t.compileShader(i);
      if (t.getShaderParameter(i, t.COMPILE_STATUS)) return i;
      console.log(t.getShaderInfoLog(i)), t.deleteShader(i)
    } _createProgram(t, e, s) {
      const i = t.createProgram();
      t.attachShader(i, e), t.attachShader(i, s), t.linkProgram(i);
      if (t.getProgramParameter(i, t.LINK_STATUS)) return i;
      console.log(t.getProgramInfoLog(i)), t.deleteProgram(i)
    }
  }, c.ImageTexture = class {
    constructor(t, e) {
      this.gl = t, this.texture = this.gl.createTexture(), this.id = h++, this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture), this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255])), this.image = new Image, this.image.addEventListener("load", this.attachImage.bind(this)), this.image.src = e
    } attachImage() {
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture), this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.image), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR)
    }
  }, c.DataTexture = class {
    constructor(t, e, s, i, o, n) {
      switch (this.gl = t, this.texture = this.gl.createTexture(), this.id = h++, this.width = s, this.height = i, this.data = o ? new Uint8Array(o) : null, e) {
        case "rgba": this.format = this.gl.RGBA;
          break;
        case "rgb": this.format = this.gl.RGB;
          break;
        case "luminance_alpha": this.format = this.gl.LUMINANCE_ALPHA;
          break;
        case "luminance": this.format = this.gl.LUMINANCE;
          break;
        default: this.format = this.gl.RGBA
      }switch (n) {
        case "linear": this.filter = this.gl.LINEAR;
          break;
        case "nearest": default: this.filter = this.gl.NEAREST
      }this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture), this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.format, s, i, 0, this.format, this.gl.UNSIGNED_BYTE, this.data), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.filter), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.filter)
    }
  }, c.Light = class {
    constructor(t, e) {
      this.type = t, "directional" === this.type ? this.direction = i.normalize([e[0], e[1], e[2]]) : "point" === this.type && (this.position = [e[0], e[1], e[2]])
    } setDirection(t, e, s) {
      this.direction = i.normalize([t, e, s])
    } setPosition(t, e, s) {
      this.position = [t, e, s]
    }
  }, c.FrameBuffer = class {
    constructor(t, e) {
      this.gl = t, this.target = e, this.buffer = this.gl.createFramebuffer(), this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.buffer), this.depthBuffer = this.gl.createRenderbuffer(), this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthBuffer), this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, this.target.width, this.target.height), this.attachTexture(this.target), this.attachRenderBuffer()
    } resize(t, e) {
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.target.texture), this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.target.format, t, e, 0, this.target.format, this.gl.UNSIGNED_BYTE, null), this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthBuffer), this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, t, e)
    } attachTexture(t) {
      this.target = t, this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0, this.gl.TEXTURE_2D, this.target.texture, 0)
    } attachRenderBuffer() {
      this.gl.framebufferRenderbuffer(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.RENDERBUFFER, this.depthBuffer)
    }
  }, c.ColorPicker = class {
    constructor(t, e, s) {
      this.gl = t, this.mouse = e, this.camera = s, this.color = new Uint8Array(4), this.selectedIndex = -1, this.objectCount = 0, this.viewport = {
        width: window.innerWidth, height: window.innerHeight, aspectRatio: window.innerWidth / window.innerHeight
      }
    } resize(t) {
      this.viewport.width = t.width, this.viewport.height = t.height, this.viewport.aspectRatio = t.width / t.height
    } _getPixel() {
      this.pixel = {
        x: this.mouse.x * this.viewport.width / this.viewport.width, y: this.viewport.height - this.mouse.y * this.viewport.height / this.viewport.height - 1
      }
    } _getColor() {
      this.gl.readPixels(0, 0, 1, 1, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.color)
    } getMatrix() {
      return this._getPixel(), "perspective" === this.camera.type ? (this.top = this.camera.near * Math.tan(this.camera.fieldOfView / 2), this.bottom = -this.top, this.right = this.top * this.camera.aspectRatio, this.left = -this.right) : "orthographic" === this.camera.type && (this.top = this.camera.top, this.bottom = this.camera.bottom, this.right = this.camera.right, this.left = this.camera.left), this.width = Math.abs(this.right - this.left), this.height = Math.abs(this.top - this.bottom), this.pixelLeft = this.left + this.pixel.x * this.width / this.viewport.width, this.pixelRight = this.pixelLeft + 1 / this.viewport.width, this.pixelTop = this.bottom + this.pixel.y * this.height / this.viewport.height, this.pixelBottom = this.pixelTop + 1 / this.viewport.height, this.near = this.camera.near, this.far = this.camera.far, "perspective" === this.camera.type ? this.matrix = [2 * this.near / (this.pixelRight - this.pixelLeft), 0, 0, 0, 0, 2 * this.near / (this.pixelTop - this.pixelBottom), 0, 0, (this.pixelRight + this.pixelLeft) / (this.pixelRight - this.pixelLeft), (this.pixelTop + this.pixelBottom) / (this.pixelTop - this.pixelBottom), -(this.far + this.near) / (this.far - this.near), -1, 0, 0, 2 * this.far * this.near / (this.near - this.far), 0] : "orthographic" === this.camera.type && (this.matrix = [2 / (this.pixelRight - this.pixelLeft), 0, 0, 0, 0, 2 / (this.pixelTop - this.pixelBottom), 0, 0, 0, 0, -2 / (this.far - this.near), 0, -(this.pixelRight + this.pixelLeft) / (this.pixelRight - this.pixelLeft), -(this.pixelTop + this.pixelBottom) / (this.pixelTop - this.pixelBottom), -(this.far + this.near) / (this.far - this.near), 1]), this.matrix
    } getObjectIndex() {
      return this._getColor(), this.selectedIndex = this.color[3] / 255 * this.objectCount - 1, this.selectedIndex
    }
  };
  class l {
    static get(t) {
      switch (t) {
        case "linear": return this._easeLinear;
        case "easeInSine": return this._easeInSine;
        case "easeOutSine": return this._easeOutSine;
        case "easeInOutSine": return this._easeInOutSine;
        case "easeInQuad": return this._easeInQuad;
        case "easeOutQuad": return this._easeOutQuad;
        case "easeInOutQuad": return this._easeInOutQuad;
        case "easeInCubic": return this._easeInCubic;
        case "easeOutCubic": return this._easeOutCubic;
        case "easeInOutCubic": return this._easeInOutCubic;
        case "easeInQuart": return this._easeInQuartic;
        case "easeOutQuart": return this._easeOutQuartic;
        case "easeInOutQuart": return this._easeInOutQuartic;
        case "easeInQuint": return this._easeInQuintic;
        case "easeOutQuint": return this._easeOutQuintic;
        case "easeInOutQuint": return this._easeInOutQuintic;
        case "easeInExpo": return this._easeInExpo;
        case "easeOutExpo": return this._easeOutExpo;
        case "easeInOutExpo": return this._easeInOutExpo;
        case "easeOutSpring": return this._easeOutSpring;
        case "easeOutBack": return this._easeOutBack;
        default: return this._easeLinear
      }
    } static _easeLinear(t) {
      return t
    } static _easeInSine(t) {
      return 1 - Math.cos(t * (Math.PI / 2))
    } static _easeOutSine(t) {
      return Math.sin(t * (Math.PI / 2))
    } static _easeInOutSine(t) {
      return -.5 * (Math.cos(Math.PI * t) - 1)
    } static _easeInQuad(t) {
      return t ** 2
    } static _easeOutQuad(t) {
      return 1 - (1 - t) ** 2
    } static _easeInOutQuad(t) {
      return t < .5 ? (2 * t) ** 2 / 2 : 1 - (2 * (1 - t)) ** 2 / 2
    } static _easeInCubic(t) {
      return t ** 3
    } static _easeOutCubic(t) {
      return 1 - (1 - t) ** 3
    } static _easeInOutCubic(t) {
      return t < .5 ? (2 * t) ** 3 / 2 : 1 - (2 * (1 - t)) ** 3 / 2
    } static _easeInQuartic(t) {
      return t ** 4
    } static _easeOutQuartic(t) {
      return 1 - (1 - t) ** 4
    } static _easeInOutQuartic(t) {
      return t < .5 ? (2 * t) ** 4 / 2 : 1 - (2 * (1 - t)) ** 4 / 2
    } static _easeInQuintic(t) {
      return t ** 5
    } static _easeOutQuintic(t) {
      return 1 - (1 - t) ** 5
    } static _easeInOutQuintic(t) {
      return t < .5 ? (2 * t) ** 5 / 2 : 1 - (2 * (1 - t)) ** 5 / 2
    } static _easeInExpo(t) {
      return Math.pow(2, 10 * (t - 1)) - .001
    } static _easeOutExpo(t) {
      return 1 - Math.pow(2, -10 * t)
    } static _easeInOutExpo(t) {
      return (t *= 2) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
    } static _easeOutSpring(t) {
      const e = .3 / (2 * Math.PI) * (Math.asin(1) || 0);
      return 1 * Math.pow(2, -10 * t) * Math.sin((t - e) * (2 * Math.PI) / .3) + 1
    } static _easeOutBack(t) {
      const e = 1.70158;
      return (t -= 1) * t * ((e + 1) * t + e) + 1
    }
  } class u {
    static multiply2DMatricies(t, e) {
      const s = t[0], i = t[1], o = t[2], n = t[3], r = t[4], a = t[5], h = t[6], c = t[7], l = t[8], u = e[0], d = e[1], p = e[2], m = e[3], g = e[4], f = e[5], v = e[6], x = e[7], w = e[8];
      return [u * s + d * n + p * h, u * i + d * r + p * c, u * o + d * a + p * l, m * s + g * n + f * h, m * i + g * r + f * c, m * o + g * a + f * l, v * s + x * n + w * h, v * i + x * r + w * c, v * o + x * a + w * l]
    } static translate2D(t, e) {
      return [1, 0, t, 0, 1, e, 0, 0, 1]
    } static scale2D(t, e) {
      return [t, 0, 0, 0, e, 0, 0, 0, 1]
    } static rotate2D(t) {
      return [Math.cos(t), -Math.sin(t), 0, Math.sin(t), Math.cos(t), 0, 0, 0, 1]
    }
  } class d {
    constructor(t, e, s, i, o, n) {
      this.target = t, this.property = e, this.targetValue = s, this.currentValue = i, this.units = o, this.direction = n, this.propertyDelta = {
      }, this.setProperties()
    } setProperties() {
      switch (this.direction) {
        case "to": this.propertyDelta = {
          start: this.currentValue, delta: this.targetValue - this.currentValue
        };
          break;
        case "from": this.propertyDelta = {
          start: this.targetValue, delta: this.currentValue - this.targetValue
        };
          break;
        case "fromTo": this.propertyDelta = {
          start: this.currentValue, delta: this.targetValue - this.currentValue
        };
          break;
        case "addClass": this.classFunction = () => {
          this.target.classList.add(this.targetValue)
        };
          break;
        case "removeClass": this.classFunction = () => {
          this.target.classList.remove(this.targetValue)
        }
      }
    } update(t) {
      "class" !== this.property ? this.target[this.property] = this.propertyDelta.start + t * this.propertyDelta.delta + this.units : (0 === t && ("addClass" === this.direction ? this.target.classList.remove(this.targetValue) : this.target.classList.add(this.targetValue)), 1 === t && this.classFunction())
    }
  } class p {
    constructor(t, e, s, i) {
      this.target = t, this.properties = e, this.direction = s, this.isDOM = i, this.unitExpression = /[a-z]+|%/, this.hasTransform = !1, this.transformPropertyKeys = ["translateX", "translateY", "rotate", "scale", "scaleX", "scaleY"], this.transformMatrix = {
      }, this.isDOM && (this.bounds = this.target.getBoundingClientRect()), this.setProperties()
    } _getTransformMatrix(t) {
      if ("none" === t || void 0 === t) return {
        translateX: 0, translateY: 0, scaleX: 1, scaleY: 1, rotate: 0
      };
      this.transformType = t.includes("3d") ? "3d" : "2d";
      const e = t.match(/matrix.*\((.+)\)/)[1].split(", ");
      return "2d" === this.transformType ? {
        translateX: e[4], translateY: e[5], scaleX: e[0], scaleY: e[3], rotate: Math.atan2(e[1], e[0]) * (180 / Math.PI)
      } : void 0
    } _getTransformPercentage(t, e) {
      return "translateX" === t ? e * (this.bounds.width / 100) : e * (this.bounds.height / 100)
    } setProperties() {
      if (this.actions = [], this.isDOM) {
        const t = getComputedStyle(this.target);
        this.transformMatrix = this._getTransformMatrix(t.transform);
        for (const e in this.properties) if (this.transformPropertyKeys.includes(e)) if (this.hasTransform = !0, "scale" === e) "fromTo" === this.direction ? (this.actions.push(new d(this.transformMatrix, "scaleX", this.properties.scale[1], this.properties.scale[0], null, this.direction)), this.actions.push(new d(this.transformMatrix, "scaleY", this.properties.scale[1], this.properties.scale[0], null, this.direction))) : (this.actions.push(new d(this.transformMatrix, "scaleX", this.properties.scale, parseFloat(this.transformMatrix.scaleX), null, this.direction)), this.actions.push(new d(this.transformMatrix, "scaleY", this.properties.scale, parseFloat(this.transformMatrix.scaleY), null, this.direction)));
        else if ("translateX" !== e && "translateY" !== e || !this.isDOM) "fromTo" === this.direction ? this.actions.push(new d(this.transformMatrix, e, this.properties[e][1], this.properties[e][0], null, this.direction)) : this.actions.push(new d(this.transformMatrix, e, this.properties[e], parseFloat(this.transformMatrix[e]), null, this.direction));
        else if ("fromTo" === this.direction) {
          const t = this._getTransformPercentage(e, this.properties[e][1]), s = this._getTransformPercentage(e, this.properties[e][0]);
          this.actions.push(new d(this.transformMatrix, e, t, s, null, this.direction))
        } else {
          let t = this._getTransformPercentage(e, this.properties[e]);
          this.actions.push(new d(this.transformMatrix, e, t, parseFloat(this.transformMatrix[e]), null, this.direction))
        } else if ("class" !== e) if ("fromTo" === this.direction) this.actions.push(new d(this.target.style, e, this.properties[e][1], this.properties[e][0], null, this.direction));
        else {
          const s = this.unitExpression.exec(t[e]), i = parseFloat(t[e].split(s)[0]);
          this.actions.push(new d(this.target.style, e, this.properties[e], i, s, this.direction))
        } else this.actions.push(new d(this.target, e, this.properties[e], null, null, this.direction))
      } else for (const t in this.properties) "fromTo" === this.direction ? this.actions.push(new d(this.target, t, this.properties[t][1], this.properties[t][0], null, this.direction)) : this.actions.push(new d(this.target, t, this.properties[t], this.target[t], null, this.direction));
      for (const t of this.actions) t.setProperties()
    } update(t) {
      for (const e of this.actions) e.update(t);
      if (this.hasTransform) {
        const t = u.multiply2DMatricies(u.multiply2DMatricies(u.scale2D(this.transformMatrix.scaleX, this.transformMatrix.scaleY), u.rotate2D(this.transformMatrix.rotate * (Math.PI / 180))), u.translate2D(this.transformMatrix.translateX, this.transformMatrix.translateY));
        this.target.style.transform = `matrix(${t[0]}, ${t[3]}, ${t[1]}, ${t[4]}, ${t[2]}, ${t[5]})`
      }
    }
  } class m {
    static to(t, e, s) {
      let i = !1, o = t;
      (t instanceof window.HTMLElement || t instanceof window.NodeList) && (i = !0, t instanceof window.NodeList && (o = [...t]));
      const n = this._setTargets(o), r = this._setTimings(n, s), a = [];
      n.forEach((t => {
        a.push(new p(t, e, "to", i))
      })), this._animate(a, r, s)
    } static from(t, e, s) {
      let i = !1, o = t;
      (t instanceof window.HTMLElement || t instanceof window.NodeList) && (i = !0, t instanceof window.NodeList && (o = [...t]));
      const n = this._setTargets(o), r = this._setTimings(n, s), a = [];
      n.forEach((t => {
        a.push(new p(t, e, "from", i))
      })), this._animate(a, r, s)
    } static fromTo(t, e, s) {
      let i = !1, o = t;
      (t instanceof window.HTMLElement || t instanceof window.NodeList) && (i = !0, t instanceof window.NodeList && (o = [...t]));
      const n = this._setTargets(o), r = this._setTimings(n, s), a = [];
      n.forEach((t => {
        a.push(new p(t, e, "fromTo", i))
      })), this._animate(a, r, s)
    } static addClass(t, e, s) {
      let i = !1, o = t, n = s || {
      };
      (t instanceof window.HTMLElement || t instanceof window.NodeList) && (i = !0, t instanceof window.NodeList && (o = [...t]));
      const r = this._setTargets(o), a = this._setTimings(r, n), h = [];
      r.forEach((t => {
        h.push(new p(t, e, "addClass", i))
      })), this._animate(h, a, n)
    } static removeClass(t, e, s) {
      let i = !1, o = t, n = s || {
      };
      (t instanceof window.HTMLElement || t instanceof window.NodeList) && (i = !0, t instanceof window.NodeList && (o = [...t]));
      const r = this._setTargets(o), a = this._setTimings(r, n), h = [];
      r.forEach((t => {
        h.push(new p(t, e, "removeClass", i))
      })), this._animate(h, a, n)
    } static _animate(t, e, s) {
      s.onStart && s.onStart();
      const i = performance.now();
      requestAnimationFrame((function o(n) {
        const r = n - i - e.delay, a = Math.min(r / e.totalDuration, 1);
        t.forEach(((t, s) => {
          const i = Math.min((r - e.stagger * s) / e.duration, 1);
          if (i > 0) {
            const s = e.easing(i);
            t.update(s)
          }
        })), a < 1 ? (s.onUpdate && s.onUpdate(), requestAnimationFrame(o)) : (t.forEach((t => {
          t.update(1)
        })), s.onComplete && s.onComplete())
      }))
    } static _setTargets(t) {
      let e = null;
      return e = Array.isArray(t) ? t : [t], e
    } static _setTimings(t, e) {
      const s = 1e3, i = {
      };
      return i.duration = e.duration ? e.duration * s : 1, i.delay = e.delay ? e.delay * s : 0, i.stagger = e.stagger ? e.stagger * s : 0, i.totalDuration = i.duration + (t.length - 1) * i.stagger, i.easing = l.get(e.ease), i
    }
  } m.Scene = class {
    constructor() {
      this.timeScale = 1e3, this.duration = 0, this.startTime = 0, this.currentTime = 0, this.progress = 0, this.started = !1, this.paused = !1, this.rewinding = !1, this.currentAnimationFrame = null, this.previousActionDuration = 0, this.actions = []
    } play() {
      this.rewinding = !1, this.started || (this.onStartCallback && this.onStartCallback(), this.started = !0), this.paused ? this.startTime = performance.now() - this.duration * this.progress : this.startTime = performance.now(), this.paused = !1;
      const t = e => {
        const s = e - this.startTime;
        this.progress = Math.min(s / this.duration, 1), this._animate(), this.progress < 1 && (this.currentAnimationFrame = requestAnimationFrame(t))
      };
      this.currentAnimationFrame = requestAnimationFrame(t)
    } pause() {
      this.paused = !0, cancelAnimationFrame(this.currentAnimationFrame)
    } rewind() {
      this.rewinding = !0, this.paused ? this.startTime = performance.now() - this.duration * (1 - this.progress) : this.startTime = performance.now(), this.paused = !1;
      const t = e => {
        const s = this.duration - (e - this.startTime);
        this.progress = Math.min(s / this.duration, 1), this._animate(), this.progress > 0 && (this.currentAnimationFrame = requestAnimationFrame(t))
      };
      this.currentAnimationFrame = requestAnimationFrame(t)
    } setProgress(t) {
      this.progress = t, !this.started && this.progress > 0 && (this.onStartCallback && this.onStartCallback(), this.started = !0);
      this.currentAnimationFrame = requestAnimationFrame((t => {
        this.duration, this.progress;
        this._animate()
      }))
    } setProgressImmediately(t) {
      this.progress = t, !this.started && this.progress > 0 && (this.onStartCallback && this.onStartCallback(), this.started = !0), this._animate()
    } _animate() {
      this.currentTime = this.duration * this.progress, this.actions.forEach(((t, e) => {
        t.progress = (this.currentTime - t.timings.start) / t.timings.totalDuration, t.started && !t.completed && (t.options.onUpdate && t.options.onUpdate(), t.moments.forEach(((e, s) => {
          const i = Math.max(this.currentTime - t.timings.start - t.timings.stagger * s, 0), o = Math.min(i / t.timings.duration, 1), n = t.timings.easing(o);
          e.update(n), t.options.toggle && 1 !== o && e.update(0)
        }))), t.progress > 0 ? (t.started || (t.options.onStart && t.options.onStart(), 0 !== t.timings.start && "from" !== t.direction && t.moments.forEach((t => {
          t.setProperties()
        }))), t.started = !0) : (!t.started || "from" !== t.direction && "fromTo" !== t.direction ? t.started || t.initialized || "from" !== t.direction && "fromTo" !== t.direction || (t.moments.forEach((t => {
          t.update(0)
        })), t.initialized = !0) : "from" === t.direction && 0 !== t.timings.start ? t.moments.forEach((t => {
          t.update(1)
        })) : t.moments.forEach((t => {
          t.update(0)
        })), t.options.toggle && t.moments.forEach((t => {
          t.update(0)
        })), t.started = !1), t.progress >= 1 ? (t.completed || (t.moments.forEach((t => {
          t.update(1)
        })), t.options.onComplete && t.options.onComplete()), t.completed = !0) : t.completed = !1
      }))
    } to(t, e, s, i = null) {
      let o = !1, n = t;
      (t instanceof window.HTMLElement || t instanceof window.NodeList || t instanceof window.SVGPathElement || t instanceof window.SVGElement || t instanceof window.SVGCircleElement) && (o = !0, t instanceof window.NodeList && (n = [...t]));
      const r = this._setTargets(n), a = this._setTimings(r, s, i), h = [];
      r.forEach((t => {
        h.push(new p(t, e, "to", o))
      })), this._add(h, a, s, "to")
    } from(t, e, s, i = null) {
      let o = !1, n = t;
      (t instanceof window.HTMLElement || t instanceof window.NodeList || t instanceof window.SVGPathElement || t instanceof window.SVGElement || t instanceof window.SVGCircleElement) && (o = !0, t instanceof window.NodeList && (n = [...t]));
      const r = this._setTargets(n), a = this._setTimings(r, s, i), h = [];
      r.forEach((t => {
        h.push(new p(t, e, "from", o))
      })), this._add(h, a, s, "from")
    } fromTo(t, e, s, i = null) {
      let o = !1, n = t;
      (t instanceof window.HTMLElement || t instanceof window.NodeList || t instanceof window.SVGPathElement || t instanceof window.SVGElement || t instanceof window.SVGCircleElement) && (o = !0, t instanceof window.NodeList && (n = [...t]));
      const r = this._setTargets(n), a = this._setTimings(r, s, i), h = [];
      r.forEach((t => {
        h.push(new p(t, e, "fromTo", o))
      })), this._add(h, a, s, "fromTo")
    } addClass(t, e, s, i = null) {
      let o = !1, n = t;
      (t instanceof window.HTMLElement || t instanceof window.NodeList) && (o = !0, t instanceof window.NodeList && (n = [...t]));
      const r = this._setTargets(n), a = this._setTimings(r, s, i), h = [];
      r.forEach((t => {
        h.push(new p(t, e, "addClass", o))
      })), this._add(h, a, s, "addClass")
    } removeClass(t, e, s, i = null) {
      let o = !1, n = t;
      (t instanceof window.HTMLElement || t instanceof window.NodeList) && (o = !0, t instanceof window.NodeList && (n = [...t]));
      const r = this._setTargets(n), a = this._setTimings(r, s, i), h = [];
      r.forEach((t => {
        h.push(new p(t, e, "removeClass", o))
      })), this._add(h, a, s, "removeClass")
    } onStart(t) {
      this.onStartCallback = t
    } _add(t, e, s, i) {
      this.actions.push({
        moments: t, timings: e, options: s, direction: i, progress: 0, initialized: !1, started: !1, completed: !1
      }), this.setProgress(0)
    } _setTargets(t) {
      let e = null;
      return e = Array.isArray(t) ? t : [t], e
    } _setTimings(t, e, s) {
      const i = {
      }, o = e.duration ? e.duration * this.timeScale : 1;
      let n = 0;
      n = null !== s ? s * this.timeScale : this.duration, i.stagger = e.stagger ? e.stagger * this.timeScale : 0;
      const r = e.delay ? e.delay * this.timeScale + n : n, a = o + (t.length - 1) * i.stagger;
      return i.start = r, i.end = r + a, i.duration = o, i.totalDuration = a, i.easing = l.get(e.ease), this.previousActionDuration = i.end, this.duration = Math.max(this.previousActionDuration, this.duration), i
    }
  }, m.Camera = class {
    constructor(t, e, s = {
    }) {
      this.element = t, this.scene = e, this.options = s, this._init()
    } _init() {
      this.observer = null, this.progress = 0, this.scrollDistance = 0, this.scrollPosition = 0, this.element.parentElement.style.height = "auto", this.viewportHeight = window.innerHeight, this.isIntersecting = !1, this.options.pinned ? (this.offset = this.element.parentElement.offsetTop, this.offset += this.options.beginOnIntersection ? -this.element.parentElement.offsetHeight : 0, this.scrollHeight = this.scene.duration, this._setScrollHeight(), this.scrollHeight += this.options.offset ? this.options.offset : 0) : (this.offset = window.pageYOffset + this.element.getBoundingClientRect().top - this.viewportHeight, this.scrollHeight = this.viewportHeight + this.element.offsetHeight), this._scrollListener = this._scrollListener.bind(this), this._createObserver()
    } resize() {
      this.viewportHeight = window.innerHeight, this.options.pinned ? (this.offset = this.element.parentElement.offsetTop, this.offset += this.options.beginOnIntersection ? -this.element.parentElement.offsetHeight : 0, this.scrollHeight = this.scene.duration, this._setScrollHeight(), this.scrollHeight += this.options.offset ? this.options.offset : 0) : (this.offset = window.pageYOffset + this.element.getBoundingClientRect().top - this.viewportHeight, this.scrollHeight = this.viewportHeight + this.element.offsetHeight)
    } setScene(t) {
      this.scene = t, this._init()
    } _setScrollHeight() {
      const t = this.scrollHeight + (this.options.beginOnIntersection ? 0 : this.viewportHeight);
      this.element.parentElement.style.height = t / this.viewportHeight * 100 + "vh"
    } _scrollListener(t) {
      this.scrollDistance = t.target.scrollingElement.scrollTop, this.scrollPosition = this.scrollDistance - this.offset, this.progress = Math.min(Math.max(this.scrollPosition / this.scrollHeight, 0), 1)
    } _createObserver() {
      this.observer = new IntersectionObserver((t => {
        t.forEach((t => {
          t.isIntersecting ? (this.isIntersecting = !0, window.addEventListener("scroll", this._scrollListener)) : (this.isIntersecting = !1, window.removeEventListener("scroll", this._scrollListener), this.progress = Math.round(this.progress))
        }))
      }), {
        threshold: this.options.threshold ? this.options.threshold : 0
      }), this.observer.observe(this.element)
    }
  };
  class g {
    constructor() {
      this.scene = new m.Scene, this.time = 0, this.then = 0, this.now = 0, this.timeScale = 5e-4, this.canvas = document.getElementById("hero-text-background"), this.renderer = new c.Renderer(this.canvas), this.volume = new c.Volume, this.camera = new c.Orthographic(-1, 1, -1, 1, -1, 1);
      const t = new c.Program(this.renderer.gl, "#ifdef GL_FRAGMENT_PRECISION_HIGH\n\tprecision highp float;\n#else\n\tprecision mediump float;\n#define GLSLIFY 1\n#endif\n\nattribute vec4 aPosition;\nattribute vec3 aNormal;\nattribute vec2 aUV;\n\nuniform mat4 uViewProjectionMatrix;\nuniform mat4 uNormalMatrix;\nuniform mat4 uLocalMatrix;\nuniform float uTime;\n\nvarying vec3 vNormal;\nvarying vec2 vUV;\nvarying vec3 vPos;\n\nvec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }\nvec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }\n\nfloat snoise(vec3 v) { \n\tconst vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n\tconst vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n\tvec3 i  = floor(v + dot(v, C.yyy) );\n\tvec3 x0 =   v - i + dot(i, C.xxx) ;\n\n\tvec3 g = step(x0.yzx, x0.xyz);\n\tvec3 l = 1.0 - g;\n\tvec3 i1 = min( g.xyz, l.zxy );\n\tvec3 i2 = max( g.xyz, l.zxy );\n\n\tvec3 x1 = x0 - i1 + 1.0 * C.xxx;\n\tvec3 x2 = x0 - i2 + 2.0 * C.xxx;\n\tvec3 x3 = x0 - 1. + 3.0 * C.xxx;\n\n\ti = mod(i, 289.0 ); \n\tvec4 p = permute( permute( permute( \n\t\ti.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n\t\t+ i.y + vec4(0.0, i1.y, i2.y, 1.0 )) \n\t\t+ i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n\tfloat n_ = 1.0/7.0;\n\tvec3  ns = n_ * D.wyz - D.xzx;\n\n\tvec4 j = p - 49.0 * floor(p * ns.z *ns.z);\n\n\tvec4 x_ = floor(j * ns.z);\n\tvec4 y_ = floor(j - 7.0 * x_ );\n\n\tvec4 x = x_ *ns.x + ns.yyyy;\n\tvec4 y = y_ *ns.x + ns.yyyy;\n\tvec4 h = 1.0 - abs(x) - abs(y);\n\n\tvec4 b0 = vec4( x.xy, y.xy );\n\tvec4 b1 = vec4( x.zw, y.zw );\n\n\tvec4 s0 = floor(b0)*2.0 + 1.0;\n\tvec4 s1 = floor(b1)*2.0 + 1.0;\n\tvec4 sh = -step(h, vec4(0.0));\n\n\tvec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n\tvec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n\tvec3 p0 = vec3(a0.xy,h.x);\n\tvec3 p1 = vec3(a0.zw,h.y);\n\tvec3 p2 = vec3(a1.xy,h.z);\n\tvec3 p3 = vec3(a1.zw,h.w);\n\n\tvec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n\tp0 *= norm.x;\n\tp1 *= norm.y;\n\tp2 *= norm.z;\n\tp3 *= norm.w;\n\n\tvec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n\tm = m * m;\n\treturn 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );\n}\n\nfloat map(float value, float min1, float max1, float min2, float max2) {\n\treturn min2 + (value - min1) * (max2 - min2) / (max1 - min1);\n}\n\nvoid main() {\n\tvec4 position = uViewProjectionMatrix * uLocalMatrix * aPosition;\n\tposition.z = map(snoise(vec3((position.xy / 2.0), (uTime / 2.0))), -0.8660254038, 0.8660254038, 0.0, 1.0);\n\tgl_Position = position;\n\tvNormal = aNormal + 0.5;\n\tvUV = aUV;\n\tvPos = position.xyz;\n}", "#ifdef GL_FRAGMENT_PRECISION_HIGH\n\tprecision highp float;\n#else\n\tprecision mediump float;\n#define GLSLIFY 1\n#endif\n\nuniform float uTime;\n\nvarying vec3 vNormal;\nvarying vec2 vUV;\nvarying vec3 vPos;\n\nvoid main() {\n\tvec4 a = vec4(0.83, 0.40, 0.38, 1.0);\n\tvec4 b = vec4(0.96, 0.75, 0.69, 1.0);\n\tvec4 c = vec4(0.40, 0.74, 0.90, 1.0);\n\tvec4 d = vec4(0.55, 0.88, 0.98, 1.0);\n\tvec4 e = vec4(0.41, 0.83, 0.56, 1.0);\n\tvec4 f = vec4(0.46, 0.92, 0.70, 1.0);\n\n\tfloat step = 1.0 / 4.0;\n\n\tvec4 color = a;\n\tcolor = mix(color, c, smoothstep(step * 1.0, step * 2.0, vPos.z));\n\tcolor = mix(color, e, smoothstep(step * 2.0, step * 3.0, vPos.z));\n\tcolor = mix(color, vec4(1.0), smoothstep(step * 3.0, step * 4.0, vPos.z));\n\n\tgl_FragColor = color;\n}"), e = new c.Plane(2, 2, 16, 1);
      this.planeMesh = new c.Mesh(e, t), this.planeMesh.setPosition(0, 0, 0), this.planeMesh.setUniform("uTime", 0, "1f"), this.volume.add(this.planeMesh), this.heroElement = document.querySelector("section.hero"), this.textElement = document.getElementById("hero-heading-key-line"), this.speed = {
        current: 1, target: 1, ease: .05
      }, this.splitTitle()
    } splitTitle() {
      const t = document.querySelector("h1"), e = [...t.childNodes];
      for (;
        t.firstChild;
      )t.removeChild(t.firstChild);
      for (let s = 0;
        s < e.length;
        s++) {
        let i = e[s];
        if (i.nodeType === Node.TEXT_NODE) {
          let e = i.textContent.split(" ");
          for (let s = 0;
            s < e.length;
            s++)if ("" !== e[0] || 0 !== s) {
              if (i = document.createElement("span"), i.setAttribute("role", "text"), "" === e[0]) {
                let t = document.createTextNode(" " + e[s]);
                i.appendChild(t)
              } else {
                let t = document.createTextNode(e[s]);
                s !== e.length - 1 && (t = document.createTextNode(e[s] + " ")), i.appendChild(t)
              } t.appendChild(i)
            }
        } t.appendChild(i)
      }
    } appear() {
      const t = document.querySelectorAll("h1 span");
      this.scene.from(t, {
        opacity: 0, translateY: 50
      }, {
        duration: 1, ease: "easeOutExpo", stagger: .1, onStart: () => {
          document.querySelector("h1").style.opacity = 1
        }
      }, 0), this.scene.from(this.canvas, {
        opacity: 0
      }, {
        duration: 2, ease: "easeOutQuint", onUpdate: () => {
          this.onResize()
        }
      }, .5), this.scene.play()
    } lerp(t, e, s) {
      return (1 - s) * t + s * e
    } onPreloaded() {
      this.appear()
    } onResize() {
      const t = this.heroElement.getBoundingClientRect(), e = this.textElement.getBoundingClientRect();
      this.canvas.parentNode.style.width = e.width + "px", this.canvas.parentNode.style.height = e.height + "px", this.canvas.parentNode.style.top = e.top - t.top + "px", this.canvas.parentNode.style.left = e.left + "px", this.renderer.resize()
    } onMouseDown(t) {
      this.speed.target = 5
    } onMouseUp(t) {
      this.speed.target = 1
    } onUpdate(t) {
      this.speed.current < 1.000001 && (this.speed.current = 1), this.speed.current = this.lerp(this.speed.current, this.speed.target, this.speed.ease), this.now = t * this.timeScale, this.time += (this.now - this.then) * this.speed.current, this.then = this.now, this.renderer.gl.clearColor(0, 0, 0, 0), this.renderer.render(this.volume, this.camera), this.planeMesh.uniforms.uTime.value = this.time
    }
  } class f {
    constructor() {
      this.visibility = {
        value: 0
      }, this.time = 0, this.then = 0, this.now = 0, this.timeScale = .003, this.canvas = document.getElementById("hero-indicator"), this.canvasSize = 0, this.ctx = this.canvas.getContext("2d"), this.iterations = 0, this.heading = document.querySelector("section.hero h1")
    } draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), this.ctx.lineWidth = 3, this.ctx.lineCap = "round";
      let t = this.canvasSize - 8, e = 1;
      for (let s = 0;
        s < this.iterations;
        s++) {
        e = .5 * Math.sin(-this.time + Math.PI / 2 + s / 2) + .5, e *= this.visibility.value, this.ctx.strokeStyle = `rgba(255, 255, 255, ${e / 2})`;
        let i = this.canvasSize / 2 - t / 2;
        this.ctx.beginPath(), this.ctx.moveTo(i, 2 + s * (this.canvasSize / 12)), this.ctx.lineTo(i + t, 2 + s * (this.canvasSize / 12)), this.ctx.stroke(), t = t / 2 + t / 8
      }
    } appear() {
      this.time = 0, m.to(this.visibility, {
        value: 1
      }, {
        duration: 2, ease: "easeInExpo"
      })
    } onPreloaded() {
      this.appear()
    } onResize() {
      const t = this.heading.getBoundingClientRect();
      if (this.canvas.clientWidth !== t.width) {
        this.canvasSize = this.canvas.width = t.width;
        let e = this.canvasSize - 8;
        for (this.iterations = 0;
          e > 4;
        )this.iterations += 1, e = e / 2 + e / 8;
        this.canvas.height = this.iterations * (this.canvasSize / 12)
      }
    } onUpdate(t) {
      this.now = t * this.timeScale, this.time += this.now - this.then, this.then = this.now, this.draw()
    }
  } class v extends s {
    constructor() {
      super(), this.isActive = !0, this.persistentAnimation = !0, this.setDOM("section.hero"), this.addAnimation(new g), this.addAnimation(new f)
    } onScroll(t) {
      t.y < this.metrics.scrollY + this.metrics.height + this.exitThreshold ? this.onEnter() : this.onExit(), this.animations.forEach((e => {
        e.onScroll && e.onScroll(t)
      }))
    }
  } class x {
    constructor() {
      this.pixelPerfect = new M, this.time = 0, this.then = 0, this.now = 0, this.timeScale = .003, this.canvas = document.getElementById("pixel-grid"), this.renderer = new c.Renderer(this.canvas), this.renderer.depthTest = !1, this.volume = new c.Volume, this.camera = new c.Perspective(70, 1, 100, 1e3), this.camera.setPosition(0, 0, 500), this.viewport = {
        width: window.innerWidth, height: window.innerHeight, aspectRatio: window.innerWidth / window.innerHeight
      }, this.gridShader = new c.Program(this.renderer.gl, "#ifdef GL_FRAGMENT_PRECISION_HIGH\n\tprecision highp float;\n#else\n\tprecision mediump float;\n#define GLSLIFY 1\n#endif\n\n#define PI 3.14159265359\n\nattribute vec4 aPosition;\nattribute vec3 aNormal;\nattribute vec2 aUV;\n\nuniform mat4 uViewProjectionMatrix;\nuniform mat4 uLocalMatrix;\nuniform vec2 uCenterPoint;\nuniform float uPointSize;\nuniform float uIntensity;\n\nvarying vec3 vNormal;\nvarying vec2 vUV;\nvarying vec3 vPos;\nvarying float vIntensity;\n\nvoid main() {\n\tfloat pixelIntensity = uIntensity * (1.0 - length(aUV.xy - uCenterPoint));\n\tfloat zoomedIntensity = (pow(abs(sin(PI * pixelIntensity / 2.0)), 64.0) * 3.0) + 1.0;\n\tvec4 newPos = aPosition;\n\tnewPos.z += zoomedIntensity * 20.0;\n\tvec4 position = uViewProjectionMatrix * uLocalMatrix * newPos;\n\tgl_Position = position;\n\tgl_PointSize = uPointSize * (1.0 / position.z) * zoomedIntensity;\n\tvNormal = aNormal;\n\tvUV = aUV;\n\tvPos = position.xyz;\n\tvIntensity = zoomedIntensity;\n}", "#ifdef GL_FRAGMENT_PRECISION_HIGH\n\tprecision highp float;\n#else\n\tprecision mediump float;\n#define GLSLIFY 1\n#endif\n\nuniform float uProgress;\nuniform float uOpacity;\n\nvarying vec3 vNormal;\nvarying vec2 vUV;\nvarying vec3 vPos;\nvarying float vIntensity;\n\nfloat map(float value, float min1, float max1, float min2, float max2) {\n\treturn min2 + (value - min1) * (max2 - min1) / (max1 - min1);\n}\n\nvoid main() {\n\tvec2 center = vec2(0.5);\n\tfloat dist = pow(-distance(vUV, center) + 1.0, uProgress);\n\tfloat distanceFromLeft = distance(gl_PointCoord.x, 0.0);\n\tfloat intensity = ((vIntensity - 1.0) / 3.0);\n\tvec3 triColor = vec3(1.0, 0.0, 0.0);\n\ttriColor = mix(vec3(0.0, 1.0, 0.0), triColor, step(distanceFromLeft, 0.33333));\n\ttriColor = mix(vec3(0.0, 0.0, 1.0), triColor, step(distanceFromLeft, 0.66666));\n\tvec3 color = mix(vec3(dist) * 0.5, triColor, intensity);\n\tgl_FragColor = vec4(color * uOpacity, uOpacity);\n}"), this.loupeShader = new c.Program(this.renderer.gl, "#ifdef GL_FRAGMENT_PRECISION_HIGH\n\tprecision highp float;\n#else\n\tprecision mediump float;\n#define GLSLIFY 1\n#endif\n\nattribute vec4 aPosition;\nattribute vec3 aNormal;\nattribute vec2 aUV;\n\nuniform mat4 uViewProjectionMatrix;\nuniform mat4 uLocalMatrix;\n\nvarying vec3 vNormal;\nvarying vec2 vUV;\nvarying vec3 vPos;\n\nvoid main() {\n\tvec4 position = uViewProjectionMatrix * uLocalMatrix * aPosition;\n\tgl_Position = position;\n\tvNormal = aNormal;\n\tvUV = aUV;\n\tvPos = position.xyz;\n}", "#ifdef GL_FRAGMENT_PRECISION_HIGH\n\tprecision highp float;\n#else\n\tprecision mediump float;\n#define GLSLIFY 1\n#endif\n\nuniform float uBaseThickness;\nuniform float uTransition;\n\nvarying vec3 vNormal;\nvarying vec2 vUV;\nvarying vec3 vPos;\n\nvoid main() {\n\tvec4 startColor = vec4(0.419, 0.831, 0.564, 1.0);\n\tvec4 endColor = vec4(0.200, 0.392, 0.517, 1.0);\n\tfloat distance = (0.5 - length(vUV - vec2(0.5))) * 2.0;\n\tfloat thickness = (uBaseThickness * (1.0 - uTransition)) + 0.0125;\n\tfloat width = smoothstep(0.005 + thickness, 0.0 + thickness, distance);\n\twidth = mix(0.0, width, smoothstep(0.0, 0.005, distance));\n\n\tvec4 finalColor = mix(startColor, endColor, uTransition);\n\n\tgl_FragColor = mix(vec4(0.0), finalColor, width);\n\n\t//gl_FragColor = vec4(distance);\n}")
    } createGridGeometry(t, e) {
      const s = [];
      let i = e;
      i % 2 != 0 && (i -= 1);
      let o = 2 * i, n = 2 * t;
      const r = t / i, a = n / o;
      for (let e = 0;
        e <= o;
        e++)for (let o = 0;
          o <= i;
          o++) {
          const i = o * r - t / 2, h = e * a - n / 2, c = 0;
          s.push(i, h, c)
        } const h = new c.Geometry(s), l = [];
      for (let e = 0;
        e < s.length;
        e += 3) {
        const i = (s[e] + t / 2) / t, o = (s[e + 1] + t / 2) / t;
        l.push(i, o)
      } return h.setAttribute("aUV", new Float32Array(l), 2), h
    } reset() {
      this.progress = {
        pointSize: this.gridSize / 2, pointOpacity: 240, rotation: 0, cameraX: 0, cameraY: -window.innerHeight / 2 + 24, cameraRotate: 0, scale: 0, centerX: .5, centerY: .5, gridY: 0, loupeX: 0, loupeY: 0, loupeZ: 50, totalOpacity: 1, colorTransition: 0, endDelay: 0
      }, this.scene = this.pixelPerfect.scene, this.scene.fromTo(this.progress, {
        pointSize: [this.gridSize / 2, this.gridSize]
      }, {
        duration: 1, ease: "easeInOutExpo"
      }, 0), this.scene.fromTo(this.progress, {
        cameraY: [-window.innerHeight / 2 + 24, 0]
      }, {
        duration: 1.25, ease: "easeInOutSine"
      }, 0), this.scene.fromTo(this.progress, {
        pointOpacity: [240, 0]
      }, {
        duration: 1.25, ease: "easeInOutExpo"
      }, .25), this.scene.fromTo(this.progress, {
        scale: [0, 1]
      }, {
        duration: .5, ease: "easeOutExpo"
      }, .75), this.scene.fromTo(this.progress, {
        gridY: [0, this.gridSize / 2]
      }, {
        duration: 2.25
      }, .75), this.viewport.height <= this.viewport.width ? (this.scene.fromTo(this.progress, {
        centerX: [.5, .75], centerY: [.5, .75], loupeX: [0, this.gridSize / 4], loupeY: [0, this.gridSize / 4]
      }, {
        duration: .5, ease: "easeInOutQuint"
      }, 1), this.scene.to(this.progress, {
        centerY: .25, loupeY: -this.gridSize / 4
      }, {
        duration: .5, ease: "easeInOutQuint"
      }, 1.5), this.scene.to(this.progress, {
        centerX: .25, centerY: .5, loupeX: -this.gridSize / 4, loupeY: 0
      }, {
        duration: 1, ease: "easeInOutQuint"
      }, 2), this.scene.fromTo(this.progress, {
        loupeZ: [50, 0], pointSize: [this.gridSize, 0], totalOpacity: [1, 0], colorTransition: [0, 1]
      }, {
        duration: 1, ease: "easeInOutQuint"
      }, 2)) : (this.scene.fromTo(this.progress, {
        centerX: [.5, .5 + this.viewport.width / this.viewport.height * .25], centerY: [.5, .75], loupeX: [0, this.gridSize / 4 * (this.viewport.width / this.viewport.height)], loupeY: [0, this.gridSize / 4]
      }, {
        duration: .5, ease: "easeInOutQuint"
      }, 1), this.scene.to(this.progress, {
        centerY: .25, loupeY: -this.gridSize / 4
      }, {
        duration: .5, ease: "easeInOutQuint"
      }, 1.5), this.scene.to(this.progress, {
        centerX: .5 - this.viewport.width / this.viewport.height * .25, centerY: .5, loupeX: -this.gridSize / 4 * (this.viewport.width / this.viewport.height), loupeY: 0
      }, {
        duration: 1, ease: "easeInOutQuint"
      }, 2), this.scene.fromTo(this.progress, {
        loupeZ: [50, 0], pointSize: [this.gridSize, 0], totalOpacity: [1, 0], colorTransition: [0, 1]
      }, {
        duration: 1, ease: "easeInOutQuint"
      }, 2)), this.scene.fromTo(this.progress, {
        endDelay: [0, 1]
      }, {
        duration: .5
      }, 3)
    } onResize(t) {
      this.viewport = t, this.camera.setFieldOfView(2 * Math.atan(t.height / 2 / 500) * (180 / Math.PI)), this.camera.setAspectRatio(t.aspectRatio), this.gridSize = Math.max(t.width, t.height);
      const e = this.createGridGeometry(Math.floor(this.gridSize), Math.floor(4 / this.gridSize * (12 * this.gridSize)));
      this.gridMesh = new c.Mesh(e, this.gridShader), this.gridMesh.drawMode = "POINTS", this.gridMesh.setUniform("uCenterPoint", [.5, .5], "2f"), this.gridMesh.setUniform("uPointSize", this.renderer.pixelRatio * (this.gridSize / 2), "1f"), this.gridMesh.setUniform("uProgress", 240, "1f"), this.gridMesh.setUniform("uIntensity", 0, "1f"), this.gridMesh.setUniform("uOpacity", 1, "1f");
      const s = new c.Plane(this.viewport.width / 3, this.viewport.width / 3, 1, 1);
      this.loupeMesh = new c.Mesh(s, this.loupeShader), this.loupeMesh.setUniform("uBaseThickness", .05 / this.viewport.width * this.viewport.width, "1f"), this.loupeMesh.setUniform("uTransition", 0, "1f"), this.volume.objects = [], this.volume.add(this.gridMesh), this.volume.add(this.loupeMesh), this.renderer.resize(), this.reset()
    } onUpdate(t) {
      this.now = t * this.timeScale, this.time += this.now - this.then, this.then = this.now, this.camera.position.y = this.progress.cameraY, this.gridMesh.uniforms.uCenterPoint.value = [this.progress.centerX, this.progress.centerY - this.progress.gridY / this.gridSize], this.gridMesh.uniforms.uProgress.value = this.progress.pointOpacity, this.gridMesh.uniforms.uIntensity.value = this.progress.scale, this.gridMesh.uniforms.uPointSize.value = this.progress.pointSize * this.renderer.pixelRatio, this.gridMesh.uniforms.uOpacity.value = this.progress.totalOpacity, this.gridMesh.position.y = this.progress.gridY, this.loupeMesh.uniforms.uTransition.value = this.progress.colorTransition, this.loupeMesh.position.x = this.progress.loupeX, this.loupeMesh.position.y = this.progress.loupeY, this.loupeMesh.position.z = this.progress.loupeZ, this.loupeMesh.setScale(this.progress.scale, this.progress.scale, this.progress.scale), this.renderer.gl.clearColor(0, 0, 0, 0), this.renderer.render(this.volume, this.camera)
    }
  } class w {
    constructor() {
      this.pixelPerfect = new M, this.textElement = document.querySelector("section.pixel-perfect p")
    } onDestroy() {
      this.textElement.style.opacity = 1, this.textElement.style.transform = ""
    } onResize(t) {
      this.textElement.style.opacity = 0, this.textElement.style.transform = "translateY(100%)", this.scene = this.pixelPerfect.scene, this.scene.fromTo(this.textElement, {
        translateY: [100, -100]
      }, {
        duration: 2, ease: "linear"
      }, 1), this.scene.fromTo(this.textElement, {
        opacity: [0, 1]
      }, {
        duration: 1, ease: "easeInOutExpo"
      }, 1), this.scene.to(this.textElement, {
        opacity: 0
      }, {
        duration: 1, ease: "easeInOutExpo"
      }, 2)
    }
  } let y = null;
  class M extends s {
    constructor() {
      if (super(), y) return y;
      y = this, this.setDOM("section.pixel-perfect"), this.attachScene(), this.progress = 0, this.addAnimation(new x), this.addAnimation(new w), this.enable()
    } initializeTextFocus() {
      const t = this.viewport.height / 100;
      this.DOM.querySelectorAll("[data-focus]").forEach((e => {
        const s = e.dataset.focus * t + this.DOM.offsetTop;
        e.dataset.focusOffset = s
      }))
    } attachScene() {
      this.scene = new m.Scene
    } onScroll(t) {
      if (super.onScroll(t), this.isActive) {
        const e = this.metrics.scrollY + this.enterThreshold, s = this.metrics.scrollY + this.metrics.height + this.exitThreshold, i = t.y - e;
        this.progress = i / (s - e)
      } else t.y <= this.metrics.scrollY + this.enterThreshold ? this.progress = 0 : this.progress = 1, this.scene.setProgressImmediately(this.progress)
    } onResize(t) {
      this.viewport = t, this.attachScene(), super.onResize(t), this.enterThreshold = this.exitThreshold = -t.height, this.initializeTextFocus()
    } onUpdate(t) {
      this.isActive && (this.scene.setProgressImmediately(this.progress), this.animations.forEach((e => {
        e.onUpdate && e.onUpdate(t)
      })))
    }
  } class T {
    constructor() {
      this.animation = new b, this.time = 0, this.then = 0, this.now = 0, this.timeScale = .003, this.canvas = document.getElementById("motion-path"), this.ctx = this.canvas.getContext("2d")
    } draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), this.ctx.rect(0, 0, this.canvas.width, this.canvas.height), this.ctx.scale(this.progress.scale, this.progress.scale), this.ctx.fillStyle = "rgb(0, 0, 0)", this.ctx.fill(), this.ctx.lineWidth = .0025 * this.viewport.width, this.ctx.strokeStyle = "rgba(29, 101, 135, 1)";
      const t = this.canvas.width / this.progress.scale / 2;
      for (var e = 0;
        e < this.iterations.count;
        e++)if (this.iterations.objects[e]) {
          this.ctx.fillStyle = `rgba(29, 101, 135, ${this.iterations.objects[e].fillOpacity})`;
          const s = this.iterations.objects[e].left / this.progress.scale;
          this.ctx.beginPath(), this.ctx.arc(s + (this.progress.scale - 1) * (s - t), this.canvas.height / this.progress.scale / 2, this.iterations.radius, 0, 2 * Math.PI, !0), this.ctx.closePath(), this.ctx.stroke(), this.ctx.fill()
        } this.ctx.strokeStyle = "rgba(29, 101, 135, 1)", this.ctx.fillStyle = `rgba(29, 101, 135, ${(this.iterations.distance - 1) / 2})`;
      const s = this.iterations.left * this.iterations.distance / this.progress.scale;
      this.ctx.beginPath(), this.ctx.arc(s + (this.progress.scale - 1) * (s - t), this.canvas.height / this.progress.scale / 2, this.iterations.radius, 0, 2 * Math.PI, !0), this.ctx.closePath(), this.ctx.stroke(), this.ctx.fill(), this.ctx.setTransform(1, 0, 0, 1, 0, 0), this.ctx.beginPath(), this.ctx.rect(0, 0, this.canvas.width, this.canvas.height), this.ctx.fillStyle = `rgba(0, 0, 0, ${this.iterations.opacity})`, this.ctx.fill(), this.clearProgress.value > 0 && (this.ctx.clearRect(this.canvas.width / 2 - this.clearProgress.value * (this.canvas.width / 2), this.canvas.height / 2 - this.clearProgress.value * (this.canvas.height / 2), this.clearProgress.value * this.canvas.width, this.clearProgress.value * this.canvas.height), 1 !== this.clearProgress.value && (this.ctx.beginPath(), this.ctx.rect(this.canvas.width / 2 - this.clearProgress.value * (this.canvas.width / 2), this.canvas.height / 2 - this.clearProgress.value * (this.canvas.height / 2), this.clearProgress.value * this.canvas.width, this.clearProgress.value * this.canvas.height), this.ctx.closePath(), this.ctx.strokeStyle = "rgb(214, 103, 97)", this.ctx.stroke()))
    } onResize(t) {
      this.viewport = t, this.canvas.width = this.viewport.width, this.canvas.height = this.viewport.height, this.iterations = {
        opacity: 0, distance: 1, count: 0, radius: this.canvas.width / 6, top: this.canvas.height / 2, left: this.canvas.width / 4, items: [], objects: []
      }, this.progress = {
        scale: 1
      }, this.clearProgress = {
        value: 0
      };
      for (let t = 0;
        t < 20;
        t++) {
        const e = t / 20, s = 1 - Math.pow(2, -10 * e), i = this.canvas.width / 4, o = 3 * i;
        this.iterations.objects.push({
          left: i + (o - i) * s, fillOpacity: s / 4
        })
      } this.scene = this.animation.scene, this.scene.fromTo(this.iterations, {
        count: [0, 20]
      }, {
        duration: 1, ease: "linear"
      }, 0), this.scene.fromTo(this.iterations, {
        distance: [1, 3]
      }, {
        duration: 1, ease: "easeOutExpo"
      }, 0), this.scene.fromTo(this.iterations, {
        opacity: [0, 1]
      }, {
        duration: 1
      }, 1), this.scene.fromTo(this.clearProgress, {
        value: [0, 1]
      }, {
        duration: 1
      }, 1), this.scene.fromTo(this.progress, {
        scale: [1, 1.5]
      }, {
        duration: 2
      }, 0)
    } onUpdate(t) {
      this.now = t * this.timeScale, this.time += this.now - this.then, this.then = this.now, this.draw()
    }
  } class P {
    constructor() {
      this.animation = new b, this.textWrapper = document.querySelector("section.animation .wrapper"), this.textElements = document.querySelectorAll("section.animation .wrapper .word-wrap .text"), this.textOverlays = document.querySelectorAll("section.animation .wrapper .word-wrap .overlay"), this.textFlourishShort = document.querySelectorAll("section.animation .wrapper .flourish-wrap svg .short"), this.textFlourishLong = document.querySelector("section.animation .wrapper .flourish-wrap svg .long"), this.overlayProgress = [{
        translateX: -101
      }, {
        translateX: -101
      }, {
        translateX: -101
      }, {
        translateX: -101
      }, {
        translateX: -101
      }], this.played = !1
    } onDestroy() {
      this.textWrapper.style.opacity = 1, this.textElements.forEach((t => {
        t.style.opacity = 1
      }))
    } onResize(t) {
      this.scene = this.animation.scene, this.textAnimation = new m.Scene, this.textAnimation.fromTo(this.overlayProgress, {
        translateX: [-101, 101]
      }, {
        duration: 1, stagger: .2, ease: "easeInOutExpo", onUpdate: () => {
          this.textOverlays.forEach(((t, e) => {
            t.style.transform = `translateX(${this.overlayProgress[e].translateX}%)`
          }))
        }
      }, 0), this.textAnimation.to(this.textElements, {
        opacity: 1
      }, {
        delay: .5, duration: .5, stagger: .2, ease: "easeOutExpo"
      }, 0), this.textAnimation.to(this.textFlourishShort, {
        "stroke-dashoffset": 31
      }, {
        duration: .5, ease: "easeInOutQuint"
      }, 1.5), this.textAnimation.to(this.textFlourishLong, {
        "stroke-dashoffset": 42
      }, {
        duration: .5, ease: "easeInOutQuint"
      }, 1.5), this.scene.fromTo(this.textWrapper, {
        opacity: [0, 1]
      }, {
        duration: .1, ease: "easeInOutExpo", onComplete: () => {
          this.played || (this.textAnimation.play(), this.played = !0)
        }
      }, 0), this.scene.fromTo(this.textWrapper, {
        opacity: [1, 0]
      }, {
        duration: .25, ease: "easeInOutExpo"
      }, .75)
    }
  } let E = null;
  class b extends s {
    constructor() {
      if (super(), E) return E;
      E = this, this.setDOM("section.animation"), this.attachScene(), this.progress = 0, this.addAnimation(new T), this.addAnimation(new P)
    } initializeTextFocus() {
      const t = this.viewport.height / 100;
      this.DOM.querySelectorAll("[data-focus]").forEach((e => {
        const s = e.dataset.focus * t + this.DOM.offsetTop;
        e.dataset.focusOffset = s
      }))
    } attachScene() {
      this.scene = new m.Scene
    } onScroll(t) {
      if (super.onScroll(t), this.isActive) {
        const e = this.metrics.scrollY + this.enterThreshold, s = this.metrics.scrollY + this.metrics.height + this.exitThreshold, i = t.y - e;
        this.progress = i / (s - e)
      } else t.y <= this.metrics.scrollY + this.enterThreshold ? this.progress = 0 : this.progress = 1, this.scene.setProgressImmediately(this.progress)
    } onResize(t) {
      this.viewport = t, this.attachScene(), super.onResize(t), this.exitThreshold = -t.height, this.initializeTextFocus()
    } onUpdate(t) {
      this.isActive && (this.scene.setProgressImmediately(this.progress), this.animations.forEach((e => {
        e.onUpdate && e.onUpdate(t)
      })))
    }
  } class S {
    constructor() {
      this.interactive = new _, this.time = 0, this.then = 0, this.now = 0, this.timeScale = .003, this.viewport = {
        width: window.innerWidth, height: window.innerHeight, aspectRatio: window.innerWidth / window.innerHeight
      }, this.bounds = {
        left: 0, top: 0
      }, this.mouse = {
        x: this.viewport.width / 2, y: this.viewport.height / 2, xOffset: 0, yOffset: 0
      }, this.clicking = !1, this.progress = {
        triggerFlash: 0, impact: 0
      }, this.canvas = document.getElementById("interactive-game"), this.ctx = this.canvas.getContext("2d")
    } reset() {
      this.progress = {
        triggerFlash: 0, impact: 0
      }, this.balloonIndexStart = 0, this.balloons = [], this.scaleFactor = Math.ceil(this.viewport.width / 600);
      for (let t = 0;
        t < 8;
        t++)this.createBalloon();
      this.scene = this.interactive.scene, this.scene.fromTo(this.canvas, {
        opacity: [1, 0]
      }, {
        duration: 1
      }, 1.5)
    } draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for (let t = 0;
        t < this.balloons.length;
        t++)this.balloons[t].y -= (this.now - this.then) * (this.viewport.height / (24 * this.scaleFactor)) * this.balloons[t].velocity * this.scaleFactor, this.balloons[t].y < -130 * this.scaleFactor ? (this.balloons[t].x = Math.random() * (this.viewport.width - 75 * this.scaleFactor), this.balloons[t].y = this.viewport.height) : this.drawBalloon(this.balloons[t]);
      this.drawReticle(this.mouse.xOffset, this.mouse.yOffset)
    } drawBalloon(t) {
      this.ctx.scale(t.scale, t.scale), this.ctx.translate(t.x / t.scale - 5 * t.scale, t.y / t.scale - 5 * t.scale);
      const e = new Path2D("m40 88 3 5H31l3-5h6ZM36.534 1c23 0 35.564 16.992 35.467 37C71.895 59.52 54 88 36.995 88 19.991 88 .995 59.524 1 38 1.005 16.476 15.534 1 36.534 1Z"), s = new Path2D("M48.955 11.223C58.169 16.089 63.054 25.922 63 36.92M37.313 93C33 106 45 109 44 120c-.706 7.766-9 10-13 5");
      this.ctx.isPointInPath(e, this.mouse.xOffset, this.mouse.yOffset) && !t.isPopped ? (this.ctx.strokeStyle = `rgba(104, 189, 231, ${t.opacity})`, this.ctx.fillStyle = `rgba(0, 0, 0, ${t.opacity})`, this.clicking && (m.fromTo(this.progress, {
        impact: [1, 0]
      }, {
        duration: .125, ease: "linear"
      }), m.to(t, {
        opacity: 0, scale: 1.5 * this.scaleFactor
      }, {
        duration: .25, ease: "easeOutExpo", onComplete: () => {
          t.x = Math.random() * (this.viewport.width - 75 * this.scaleFactor), t.y = this.viewport.height, t.isPopped = !1, t.opacity = 1, t.scale = this.scaleFactor
        }
      }), t.isPopped = !0)) : (this.ctx.strokeStyle = `rgba(214, 103, 97, ${t.opacity})`, this.ctx.fillStyle = `rgba(0, 0, 0, ${t.opacity})`), this.ctx.fill(e), this.ctx.stroke(e), this.ctx.stroke(s), this.ctx.setTransform(1, 0, 0, 1, 0, 0)
    } createBalloon(t, e) {
      let s = 0, i = 0;
      s = t || Math.random() * (this.viewport.width - 75 * this.scaleFactor), i = e || Math.random() * this.viewport.height;
      const o = 3 * Math.random() + 1;
      this.balloons.push({
        id: this.balloonIndexStart, isPopped: !1, scale: this.scaleFactor, opacity: 1, x: s, y: i, velocity: o
      }), this.balloonIndexStart++
    } drawReticle(t, e) {
      this.reticleLines(t, e), this.reticleCircle(t, e), this.reticleChevrons(t, e), this.reticleTargetPoint(t, e), this.reticleImpact(t, e)
    } reticleLines(t, e) {
      this.ctx.strokeStyle = "#D66761", this.ctx.lineWidth = 2, this.ctx.lineCap = "round", this.ctx.lineJoin = "round", this.ctx.beginPath(), this.ctx.moveTo(0, e), this.ctx.lineTo(t - 60, e), this.ctx.moveTo(t + 60, e), this.ctx.lineTo(this.canvas.width, e), this.ctx.moveTo(t, 0), this.ctx.lineTo(t, e - 60), this.ctx.moveTo(t, e + 60), this.ctx.lineTo(t, this.canvas.height), this.ctx.closePath(), this.ctx.stroke(), this.ctx.strokeStyle = "#FFFFFF", this.ctx.beginPath(), this.ctx.moveTo(0 + (t - 60) * (1 - this.progress.triggerFlash), e), this.ctx.lineTo(t - 60, e), this.ctx.moveTo(t + 60, e), this.ctx.lineTo((t + 60) * (1 - this.progress.triggerFlash) + this.canvas.width * this.progress.triggerFlash, e), this.ctx.moveTo(t, 0 + (e - 60) * (1 - this.progress.triggerFlash)), this.ctx.lineTo(t, e - 60), this.ctx.moveTo(t, e + 60), this.ctx.lineTo(t, (e + 60) * (1 - this.progress.triggerFlash) + this.canvas.height * this.progress.triggerFlash), this.ctx.closePath(), this.ctx.stroke()
    } reticleCircle(t, e) {
      this.ctx.strokeStyle = "#D66761", this.ctx.beginPath(), this.ctx.arc(t, e, 36, 0, 2 * Math.PI, !0), this.ctx.closePath(), this.ctx.stroke(), this.ctx.strokeStyle = `rgba(255, 255, 255, ${this.progress.triggerFlash}`, this.ctx.beginPath(), this.ctx.arc(t, e, 36, 0, 2 * Math.PI, !0), this.ctx.closePath(), this.ctx.stroke()
    } reticleChevrons(t, e) {
      this.ctx.strokeStyle = "#FBE7E6", this.ctx.beginPath(), this.ctx.moveTo(t - 10, e - 18 - 6 * this.progress.triggerFlash), this.ctx.lineTo(t, e - 8 - 6 * this.progress.triggerFlash), this.ctx.lineTo(t + 10, e - 18 - 6 * this.progress.triggerFlash), this.ctx.stroke(), this.ctx.beginPath(), this.ctx.moveTo(t - 18 - 6 * this.progress.triggerFlash, e - 10), this.ctx.lineTo(t - 8 - 6 * this.progress.triggerFlash, e), this.ctx.lineTo(t - 18 - 6 * this.progress.triggerFlash, e + 10), this.ctx.stroke(), this.ctx.beginPath(), this.ctx.moveTo(t - 10, e + 18 + 6 * this.progress.triggerFlash), this.ctx.lineTo(t, e + 8 + 6 * this.progress.triggerFlash), this.ctx.lineTo(t + 10, e + 18 + 6 * this.progress.triggerFlash), this.ctx.stroke(), this.ctx.beginPath(), this.ctx.moveTo(t + 18 + 6 * this.progress.triggerFlash, e - 10), this.ctx.lineTo(t + 8 + 6 * this.progress.triggerFlash, e), this.ctx.lineTo(t + 18 + 6 * this.progress.triggerFlash, e + 10), this.ctx.stroke()
    } reticleTargetPoint(t, e) {
      this.ctx.fillStyle = `rgba(255, 255, 255, ${this.progress.triggerFlash}`, this.ctx.beginPath(), this.ctx.arc(t, e, 4, 0, 2 * Math.PI, !0), this.ctx.closePath(), this.ctx.fill()
    } reticleImpact(t, e) {
      this.ctx.fillStyle = "#FFFFFF";
      const s = -Math.PI / 8;
      this.progress.impact > 0 && (this.ctx.beginPath(), this.ctx.moveTo(t + Math.cos(s) * (72 - 24 * this.progress.impact), e + Math.sin(s) * (72 - 24 * this.progress.impact)), this.ctx.lineTo(t + 72 * Math.cos(s), e + 72 * Math.sin(s)), this.ctx.closePath(), this.ctx.stroke(), this.ctx.beginPath(), this.ctx.moveTo(t + Math.cos(2 * s) * (60 - 12 * this.progress.impact), e + Math.sin(2 * s) * (60 - 12 * this.progress.impact)), this.ctx.lineTo(t + 60 * Math.cos(2 * s), e + 60 * Math.sin(2 * s)), this.ctx.closePath(), this.ctx.stroke(), this.ctx.beginPath(), this.ctx.moveTo(t + Math.cos(3 * s) * (72 - 24 * this.progress.impact), e + Math.sin(3 * s) * (72 - 24 * this.progress.impact)), this.ctx.lineTo(t + 72 * Math.cos(3 * s), e + 72 * Math.sin(3 * s)), this.ctx.closePath(), this.ctx.stroke(), this.ctx.beginPath(), this.ctx.moveTo(t + Math.cos(5 * s) * (60 - 12 * this.progress.impact), e + Math.sin(5 * s) * (60 - 12 * this.progress.impact)), this.ctx.lineTo(t + 60 * Math.cos(5 * s), e + 60 * Math.sin(5 * s)), this.ctx.closePath(), this.ctx.stroke(), this.ctx.beginPath(), this.ctx.moveTo(t + Math.cos(6 * s) * (96 - 48 * this.progress.impact), e + Math.sin(6 * s) * (96 - 48 * this.progress.impact)), this.ctx.lineTo(t + 96 * Math.cos(6 * s), e + 96 * Math.sin(6 * s)), this.ctx.closePath(), this.ctx.stroke(), this.ctx.beginPath(), this.ctx.moveTo(t + Math.cos(7 * s) * (60 - 12 * this.progress.impact), e + Math.sin(7 * s) * (60 - 12 * this.progress.impact)), this.ctx.lineTo(t + 60 * Math.cos(7 * s), e + 60 * Math.sin(7 * s)), this.ctx.closePath(), this.ctx.stroke(), this.ctx.beginPath(), this.ctx.moveTo(t + Math.cos(9 * s) * (72 - 24 * this.progress.impact), e + Math.sin(9 * s) * (72 - 24 * this.progress.impact)), this.ctx.lineTo(t + 72 * Math.cos(9 * s), e + 72 * Math.sin(9 * s)), this.ctx.closePath(), this.ctx.stroke(), this.ctx.beginPath(), this.ctx.moveTo(t + Math.cos(10 * s) * (60 - 12 * this.progress.impact), e + Math.sin(10 * s) * (60 - 12 * this.progress.impact)), this.ctx.lineTo(t + 60 * Math.cos(10 * s), e + 60 * Math.sin(10 * s)), this.ctx.closePath(), this.ctx.stroke(), this.ctx.beginPath(), this.ctx.moveTo(t + Math.cos(11 * s) * (72 - 24 * this.progress.impact), e + Math.sin(11 * s) * (72 - 24 * this.progress.impact)), this.ctx.lineTo(t + 72 * Math.cos(11 * s), e + 72 * Math.sin(11 * s)), this.ctx.closePath(), this.ctx.stroke(), this.ctx.beginPath(), this.ctx.moveTo(t + Math.cos(13 * s) * (60 - 12 * this.progress.impact), e + Math.sin(13 * s) * (60 - 12 * this.progress.impact)), this.ctx.lineTo(t + 60 * Math.cos(13 * s), e + 60 * Math.sin(13 * s)), this.ctx.closePath(), this.ctx.stroke(), this.ctx.beginPath(), this.ctx.moveTo(t + Math.cos(14 * s) * (96 - 48 * this.progress.impact), e + Math.sin(14 * s) * (96 - 48 * this.progress.impact)), this.ctx.lineTo(t + 96 * Math.cos(14 * s), e + 96 * Math.sin(14 * s)), this.ctx.closePath(), this.ctx.stroke(), this.ctx.beginPath(), this.ctx.moveTo(t + Math.cos(15 * s) * (60 - 12 * this.progress.impact), e + Math.sin(15 * s) * (60 - 12 * this.progress.impact)), this.ctx.lineTo(t + 60 * Math.cos(15 * s), e + 60 * Math.sin(15 * s)), this.ctx.closePath(), this.ctx.stroke())
    } calculateMouseOffset() {
      this.mouse.xOffset = this.mouse.x - this.bounds.left, this.mouse.yOffset = this.mouse.y - this.bounds.top
    } lerp(t, e, s) {
      return (1 - s) * t + s * e
    } onResize(t) {
      this.viewport = t, this.canvas.width = this.viewport.width, this.canvas.height = this.viewport.height, this.reset()
    } onMouseDown(t) {
      this.bounds = this.canvas.getBoundingClientRect(), m.fromTo(this.progress, {
        triggerFlash: [1, 0]
      }, {
        duration: 1, ease: "easeOutExpo"
      });
      const e = t.changedTouches;
      e ? (this.mouse.x = e[0].clientX, this.mouse.y = e[0].clientY) : (this.mouse.x = t.clientX, this.mouse.y = t.clientY), this.clicking = !0
    } onMouseUp(t) {
      this.clicking = !1
    } onMouseMove(t) {
      this.bounds = this.canvas.getBoundingClientRect(), this.mouse.x = t.clientX, this.mouse.y = t.clientY
    } onUpdate(t) {
      this.now = t * this.timeScale, this.time += this.now - this.then, this.calculateMouseOffset(), this.draw(), this.then = this.now
    }
  } class R {
    constructor() {
      this.interactive = new _, this.textElement = document.querySelector("section.interactive span")
    } onDestroy() {
      this.textElement.style.opacity = 1, this.textElement.style.transform = ""
    } onResize(t) {
      this.textElement.style.opacity = 0, this.textElement.style.transform = "scale(0.5)", this.scene = this.interactive.scene, this.scene.fromTo(this.textElement, {
        scale: [.5, 1.5]
      }, {
        duration: 2, ease: "linear"
      }, 0), this.scene.fromTo(this.textElement, {
        opacity: [0, 1]
      }, {
        duration: 1, ease: "easeInOutExpo"
      }, 0), this.scene.to(this.textElement, {
        opacity: 0
      }, {
        duration: 1, ease: "easeInOutExpo"
      }, 1)
    }
  } let I = null;
  class _ extends s {
    constructor() {
      if (super(), I) return I;
      I = this, this.persistentAnimation = !0, this.setDOM("section.interactive"), this.attachScene(), this.progress = 0, this.addAnimation(new S), this.addAnimation(new R)
    } initializeTextFocus() {
      const t = this.viewport.height / 100;
      this.DOM.querySelectorAll("[data-focus]").forEach((e => {
        const s = e.dataset.focus * t + this.DOM.offsetTop;
        e.dataset.focusOffset = s
      }))
    } attachScene() {
      this.scene = new m.Scene
    } onScroll(t) {
      if (super.onScroll(t), this.isActive) {
        const e = this.metrics.scrollY + this.enterThreshold, s = this.metrics.scrollY + this.metrics.height + this.exitThreshold, i = t.y - e;
        this.progress = i / (s - e)
      } else t.y <= this.metrics.scrollY + this.enterThreshold ? this.progress = 0 : this.progress = 1, this.scene.setProgressImmediately(this.progress)
    } onResize(t) {
      this.viewport = t, this.attachScene(), super.onResize(t), this.exitThreshold = 0, this.initializeTextFocus()
    } onMouseMove(t) {
      this.isActive && this.animations.forEach((e => {
        e.onMouseMove && e.onMouseMove(t)
      }))
    } onUpdate(t) {
      this.isActive && (this.scene.setProgressImmediately(this.progress), this.animations.forEach((e => {
        e.onUpdate && e.onUpdate(t)
      })))
    }
  } class z {
    constructor() {
      this.accessible = new O, this.viewport = {
        width: window.innerWidth, height: window.innerHeight, aspectRatio: window.innerWidth / window.innerHeight
      }, this.metrics = {
      }, this.motorPathHasRun = !1, this.visionPathHasRun = !1, this.hearingPathHasRun = !1, this.motorIcon = document.getElementById("motor-icon"), this.visionIcon = document.getElementById("vision-icon"), this.hearingIcon = document.getElementById("hearing-icon"), this.motorPath = document.getElementById("motor-icon--hand"), this.visionOuterPath = document.getElementById("vision-icon--outer"), this.visionInnerPath = document.querySelector("section.accessible #vision-icon circle"), this.hearingOuterPath = document.getElementById("hearing-icon--outer"), this.hearingInnerPath = document.getElementById("hearing-icon--inner"), this.hearingSquigglePath = document.getElementById("hearing-icon--squiggle"), this.motorWaves = document.querySelectorAll("section.accessible #motor-icon .wave"), this.visionWaves = document.querySelectorAll("section.accessible #vision-icon .wave"), this.hearingWaves = document.querySelectorAll("section.accessible #hearing-icon .wave")
    } onScroll(t) {
      const e = this.accessible.metrics.scrollY - this.viewport.height;
      t.y >= e + this.metrics.motorOffset && (this.motorPathHasRun || (this.motorScene.play(), this.motorPathHasRun = !0)), t.y >= e + this.metrics.visionOffset && (this.visionPathHasRun || (this.visionScene.play(), this.visionPathHasRun = !0)), t.y >= e + this.metrics.hearingOffset && (this.hearingPathHasRun || (this.hearingScene.play(), this.hearingPathHasRun = !0))
    } onDestroy() {
      this.motorIcon.style.opacity = 1, this.motorIcon.style.transform = "", this.visionIcon.style.opacity = 1, this.visionIcon.style.transform = "", this.hearingIcon.style.opacity = 1, this.hearingIcon.style.transform = "", this.motorWaves.forEach((t => {
        t.style.opacity = 1
      })), this.visionWaves.forEach((t => {
        t.style.opacity = 1
      })), this.hearingWaves.forEach((t => {
        t.style.opacity = 1
      }))
    } onResize(t) {
      this.viewport = t, this.motorPathHasRun = !1, this.visionPathHasRun = !1, this.hearingPathHasRun = !1, this.metrics.motorOffset = this.motorIcon.parentNode.offsetTop - this.viewport.height / 8, this.metrics.visionOffset = this.visionIcon.parentNode.offsetTop - this.viewport.height / 8, this.metrics.hearingOffset = this.hearingIcon.parentNode.offsetTop - this.viewport.height / 8, this.motorScene = new m.Scene, this.motorScene.fromTo(this.motorIcon, {
        scale: [.8, 1], opacity: [0, 1]
      }, {
        duration: 2.5, ease: "easeInOutQuint"
      }, 0), this.motorScene.fromTo(this.motorPath, {
        "stroke-dashoffset": [954, 0]
      }, {
        duration: 2.5, ease: "easeInOutQuint"
      }, 0), this.motorScene.fromTo(this.motorWaves, {
        opacity: [0, .5]
      }, {
        duration: .5, ease: "easeInOutSine", onComplete: () => {
          this.motorIcon.classList.add("idle")
        }
      }, 2), this.visionScene = new m.Scene, this.visionScene.fromTo(this.visionIcon, {
        scale: [.8, 1], opacity: [0, 1]
      }, {
        duration: 2.5, ease: "easeInOutQuint"
      }, 0), this.visionScene.fromTo(this.visionOuterPath, {
        "stroke-dashoffset": [555, 0]
      }, {
        duration: 2.5, ease: "easeInOutQuint"
      }, 0), this.visionScene.fromTo(this.visionInnerPath, {
        "stroke-dashoffset": [230, 0]
      }, {
        duration: 2, ease: "easeInOutQuint"
      }, .5), this.visionScene.fromTo(this.visionWaves, {
        opacity: [0, .5]
      }, {
        duration: .5, ease: "easeInOutSine", onComplete: () => {
          this.visionIcon.classList.add("idle")
        }
      }, 2), this.hearingScene = new m.Scene, this.hearingScene.fromTo(this.hearingIcon, {
        scale: [.8, 1], opacity: [0, 1]
      }, {
        duration: 2.5, ease: "easeInOutQuint"
      }, 0), this.hearingScene.fromTo(this.hearingOuterPath, {
        "stroke-dashoffset": [468, 936]
      }, {
        duration: 2, ease: "easeInOutQuint"
      }, 0), this.hearingScene.fromTo(this.hearingInnerPath, {
        "stroke-dashoffset": [138, 276]
      }, {
        duration: 2.5, ease: "easeInOutQuint"
      }, 0), this.hearingScene.fromTo(this.hearingSquigglePath, {
        "stroke-dashoffset": [55, 110]
      }, {
        duration: 1.25, ease: "easeOutQuint"
      }, 1.25), this.hearingScene.fromTo(this.hearingWaves, {
        opacity: [0, .5]
      }, {
        duration: .5, ease: "easeInOutSine", onComplete: () => {
          this.hearingIcon.classList.add("idle")
        }
      }, 2)
    }
  } let A = null;
  class O extends s {
    constructor() {
      if (super(), A) return A;
      A = this, this.setDOM("section.accessible"), this.attachScene(), this.progress = 0, this.addAnimation(new z)
    } initializeTextFocus() {
      const t = this.viewport.height / 100;
      this.DOM.querySelectorAll("[data-focus]").forEach((e => {
        const s = e.dataset.focus * t + this.DOM.offsetTop;
        e.dataset.focusOffset = s
      }))
    } attachScene() {
      this.scene = new m.Scene
    } onScroll(t) {
      if (super.onScroll(t), this.isActive) {
        const e = this.metrics.scrollY + this.enterThreshold, s = this.metrics.scrollY + this.metrics.height + this.exitThreshold, i = t.y - e;
        this.progress = i / (s - e)
      } else t.y <= this.metrics.scrollY + this.enterThreshold ? this.progress = 0 : this.progress = 1, this.scene.setProgressImmediately(this.progress)
    } onResize(t) {
      this.viewport = t, this.attachScene(), super.onResize(t), this.enterThreshold = -t.height, this.initializeTextFocus()
    } onUpdate(t) {
      this.isActive && (this.scene.setProgressImmediately(this.progress), this.animations.forEach((e => {
        e.onUpdate && e.onUpdate(t)
      })))
    }
  } class D {
    constructor() {
      this.dimensions = new U, this.progress = {
        value: 0
      }, this.color = {
        r: 0, g: 0, b: 0
      }, this.background = document.querySelectorAll("section.dimensions .dimensions--gate__inner"), this.gate = document.querySelectorAll("section.dimensions .dimensions--gate")
    } onResize(t) {
      this.viewport = t, this.scene = this.dimensions.scene, this.scene.fromTo(this.progress, {
        value: [0, 3]
      }, {
        duration: 3
      }, 0), this.scene.fromTo(this.gate, {
        scaleY: [1, .5]
      }, {
        duration: 1.75
      }, 0), this.scene.fromTo(this.gate, {
        scaleY: [.5, 0]
      }, {
        duration: .25
      }, 1.75)
    } onUpdate(t) {
      this.progress.value >= 0 && this.progress.value < 1.25 ? this.background.forEach((t => {
        t.style.backgroundColor = "rgb(37, 40, 37)", t.style.opacity = 2 * this.progress.value
      })) : this.progress.value >= 1.25 && this.progress.value < 1.75 ? this.background.forEach((t => {
        t.style.backgroundColor = "rgb(39, 37, 36)", t.style.opacity = 1
      })) : this.background.forEach((t => {
        t.style.backgroundColor = "rgb(36, 37, 40)", t.style.opacity = 1
      }))
    }
  } class L {
    constructor() {
      this.dimensions = new U, this.time = 0, this.then = 0, this.now = 0, this.timeScale = .003, this.canvas = document.getElementById("dimensions-tesseracts"), this.renderer = new c.Renderer(this.canvas), this.volume = new c.Volume, this.camera = new c.Orthographic(-1, 1, -1, 1, -1, 1), this.viewport = {
        width: window.innerWidth, height: window.innerHeight, aspectRatio: window.innerWidth / window.innerHeight
      }, this.tesseractShader = new c.Program(this.renderer.gl, "#ifdef GL_FRAGMENT_PRECISION_HIGH\n\tprecision highp float;\n#else\n\tprecision mediump float;\n#define GLSLIFY 1\n#endif\n\nattribute vec4 aPosition;\nattribute vec3 aNormal;\nattribute vec2 aUV;\n\nuniform mat4 uViewProjectionMatrix;\nuniform mat4 uLocalMatrix;\n\nvarying vec3 vNormal;\nvarying vec2 vUV;\nvarying vec3 vPos;\n\nvoid main() {\n\tvec4 position = uViewProjectionMatrix * uLocalMatrix * aPosition;\n\tgl_Position = position;\n\tvNormal = aNormal;\n\tvUV = aUV;\n\tvPos = position.xyz;\n}", "#ifdef GL_FRAGMENT_PRECISION_HIGH\n\tprecision highp float;\n#else\n\tprecision mediump float;\n#define GLSLIFY 1\n#endif\n\nuniform float uGreenToRed;\nuniform float uRedToBlue;\n\nvarying vec3 vNormal;\nvarying vec2 vUV;\nvarying vec3 vPos;\n\nvoid main() {\n\tfloat distance = 0.1 + (1.0 - 0.1) * (-vPos.z - (-0.2828427125)) / (0.2828427125 - (-0.2828427125));\n\tvec3 red = vec3(0.960, 0.752, 0.698) * distance;\n\tvec3 green = vec3(0.635, 0.964, 0.811) * distance;\n\tvec3 blue = vec3(0.682, 0.909, 0.980) * distance;\n\n\tvec3 greenToRed = mix(green, red, uGreenToRed);\n\tvec3 redToBlue = mix(greenToRed, blue, uRedToBlue);\n\tvec4 color = vec4(redToBlue, 1.0);\n\n\tgl_FragColor = color;\n}"), this.createTesseracts()
    } createCube(t) {
      const e = new c.Collection;
      e.isOuter = t;
      const s = t ? .005625 : .0075, i = new c.Cylinder(s, .2, 8), o = new c.Sphere(s, 8), n = new c.Mesh(i, this.tesseractShader);
      n.setPosition(0, .1, .1), n.setRotationY(90), n.setParent(e), this.tesseracts.push(n);
      const r = new c.Mesh(i, this.tesseractShader);
      r.setPosition(0, -.1, .1), r.setRotationY(90), r.setParent(e), this.tesseracts.push(r);
      const a = new c.Mesh(i, this.tesseractShader);
      a.setPosition(-.1, 0, .1), a.setRotationX(90), a.setParent(e), this.tesseracts.push(a);
      const h = new c.Mesh(i, this.tesseractShader);
      h.setPosition(.1, 0, .1), h.setRotationX(90), h.setParent(e), this.tesseracts.push(h);
      const l = new c.Mesh(o, this.tesseractShader);
      l.setPosition(-.1, .1, .1), l.setParent(e), this.tesseracts.push(l);
      const u = new c.Mesh(o, this.tesseractShader);
      u.setPosition(.1, .1, .1), u.setParent(e), this.tesseracts.push(u);
      const d = new c.Mesh(o, this.tesseractShader);
      d.setPosition(-.1, -.1, .1), d.setParent(e), this.tesseracts.push(d);
      const p = new c.Mesh(o, this.tesseractShader);
      p.setPosition(.1, -.1, .1), p.setParent(e), this.tesseracts.push(p);
      const m = new c.Mesh(i, this.tesseractShader);
      m.setPosition(0, .1, -.1), m.setRotationY(90), m.setParent(e), this.tesseracts.push(m);
      const g = new c.Mesh(i, this.tesseractShader);
      g.setPosition(0, -.1, -.1), g.setRotationY(90), g.setParent(e), this.tesseracts.push(g);
      const f = new c.Mesh(i, this.tesseractShader);
      f.setPosition(-.1, 0, -.1), f.setRotationX(90), f.setParent(e), this.tesseracts.push(f);
      const v = new c.Mesh(i, this.tesseractShader);
      v.setPosition(.1, 0, -.1), v.setRotationX(90), v.setParent(e), this.tesseracts.push(v);
      const x = new c.Mesh(o, this.tesseractShader);
      x.setPosition(-.1, .1, -.1), x.setParent(e), this.tesseracts.push(x);
      const w = new c.Mesh(o, this.tesseractShader);
      w.setPosition(.1, .1, -.1), w.setParent(e), this.tesseracts.push(w);
      const y = new c.Mesh(o, this.tesseractShader);
      y.setPosition(-.1, -.1, -.1), y.setParent(e), this.tesseracts.push(y);
      const M = new c.Mesh(o, this.tesseractShader);
      M.setPosition(.1, -.1, -.1), M.setParent(e), this.tesseracts.push(M);
      const T = new c.Mesh(i, this.tesseractShader);
      T.setPosition(-.1, .1, 0), T.setParent(e), this.tesseracts.push(T);
      const P = new c.Mesh(i, this.tesseractShader);
      P.setPosition(.1, .1, 0), P.setParent(e), this.tesseracts.push(P);
      const E = new c.Mesh(i, this.tesseractShader);
      E.setPosition(-.1, -.1, 0), E.setParent(e), this.tesseracts.push(E);
      const b = new c.Mesh(i, this.tesseractShader);
      return b.setPosition(.1, -.1, 0), b.setParent(e), this.tesseracts.push(b), e
    } createLineInstance(t, e, s, i, o, n) {
      const r = new c.Mesh(t, this.tesseractShader);
      r.setParent(n), r.setPosition(e.x, e.y, e.z), r.setRotationX(i), r.setRotationY(o), r.startPosition = e, r.endPositionDelta = s, this.tesseractLines.push(r)
    } createTesseractInstance(t) {
      const e = this.createCube(!1);
      e.setPosition(t.x, t.y, t.z);
      const s = this.createCube(!0);
      s.setPosition(t.x, t.y, t.z);
      const i = new c.Cylinder(.005625, .2, 4);
      this.createLineInstance(i, {
        x: -.1, y: .1, z: .1
      }, {
        x: -.05, y: .05, z: .05
      }, -45, -45, e), this.createLineInstance(i, {
        x: .1, y: .1, z: .1
      }, {
        x: .05, y: .05, z: .05
      }, -45, 45, e), this.createLineInstance(i, {
        x: -.1, y: .1, z: -.1
      }, {
        x: -.05, y: .05, z: -.05
      }, 45, 45, e), this.createLineInstance(i, {
        x: .1, y: .1, z: -.1
      }, {
        x: .05, y: .05, z: -.05
      }, 45, -45, e), this.createLineInstance(i, {
        x: -.1, y: -.1, z: .1
      }, {
        x: -.05, y: -.05, z: .05
      }, 45, -45, e), this.createLineInstance(i, {
        x: .1, y: -.1, z: .1
      }, {
        x: .05, y: -.05, z: .05
      }, 45, 45, e), this.createLineInstance(i, {
        x: -.1, y: -.1, z: -.1
      }, {
        x: -.05, y: -.05, z: -.05
      }, -45, 45, e), this.createLineInstance(i, {
        x: .1, y: -.1, z: -.1
      }, {
        x: .05, y: -.05, z: -.05
      }, -45, -45, e), this.tesseractParents.push(e), this.tesseractParents.push(s)
    } createTesseracts() {
      this.tesseracts = [], this.tesseractLines = [], this.tesseractParents = [], this.viewport.aspectRatio > 1 ? (this.createTesseractInstance({
        x: -.625 * this.viewport.aspectRatio, y: .625, z: 0
      }), this.createTesseractInstance({
        x: 0, y: .625, z: 0
      }), this.createTesseractInstance({
        x: .625 * this.viewport.aspectRatio, y: .625, z: 0
      }), this.createTesseractInstance({
        x: -.625 * this.viewport.aspectRatio, y: -.625, z: 0
      }), this.createTesseractInstance({
        x: 0, y: -.625, z: 0
      }), this.createTesseractInstance({
        x: .625 * this.viewport.aspectRatio, y: -.625, z: 0
      })) : (this.createTesseractInstance({
        x: -.4375 * this.viewport.aspectRatio, y: .625, z: 0
      }), this.createTesseractInstance({
        x: .4375 * this.viewport.aspectRatio, y: .625, z: 0
      }), this.createTesseractInstance({
        x: -.4375 * this.viewport.aspectRatio, y: -.625, z: 0
      }), this.createTesseractInstance({
        x: .4375 * this.viewport.aspectRatio, y: -.625, z: 0
      })), this.tesseracts.forEach((t => {
        t.setUniform("uGreenToRed", 0, "1f"), t.setUniform("uRedToBlue", 0, "1f"), this.volume.add(t)
      })), this.tesseractLines.forEach((t => {
        t.setUniform("uGreenToRed", 0, "1f"), t.setUniform("uRedToBlue", 0, "1f"), this.volume.add(t)
      }))
    } reset() {
      this.progress = {
        reveal2D: 0, reveal3D: 0, reveal4D: 0, totalDuration: 0
      }, this.scene = this.dimensions.scene, this.scene.fromTo(this.progress, {
        reveal2D: [0, 1]
      }, {
        duration: 1.25
      }, 0), this.scene.fromTo(this.progress, {
        reveal3D: [0, 1]
      }, {
        duration: .5
      }, 1.25), this.scene.fromTo(this.progress, {
        reveal4D: [0, 1]
      }, {
        duration: 1.25
      }, 1.75), this.scene.fromTo(this.progress, {
        totalDuration: [0, 1]
      }, {
        duration: 3
      }, 0)
    } onResize(t) {
      this.viewport = t, this.camera.setLeft(-t.aspectRatio), this.camera.setRight(t.aspectRatio), this.volume.objects = [], this.createTesseracts(), this.renderer.resize(), this.reset()
    } onUpdate(t) {
      this.now = t * this.timeScale, this.time += this.now - this.then, this.then = this.now;
      for (let t = 0;
        t < this.tesseractParents.length;
        t++)this.tesseractParents[t].setScale(this.progress.reveal2D, this.progress.reveal2D, this.progress.reveal2D), this.tesseractParents[t].setRotationX(20 * this.progress.reveal3D - 15 * this.progress.reveal4D), this.tesseractParents[t].setRotationY(20 * this.progress.reveal3D + 90 * this.progress.reveal4D), this.tesseractParents[t].isOuter && this.tesseractParents[t].setScale(this.progress.reveal2D + this.progress.reveal4D, this.progress.reveal2D + this.progress.reveal4D, this.progress.reveal2D + this.progress.reveal4D);
      for (let t = 0;
        t < this.tesseractLines.length;
        t++)this.progress.reveal2D >= 1 && this.progress.reveal3D < 1 ? (this.tesseractLines[t].uniforms.uGreenToRed.value = 1, this.tesseractLines[t].uniforms.uRedToBlue.value = 0) : this.progress.reveal3D >= 1 && this.progress.reveal4D < 1 ? (this.tesseractLines[t].uniforms.uGreenToRed.value = 1, this.tesseractLines[t].uniforms.uRedToBlue.value = 1) : (this.tesseractLines[t].uniforms.uGreenToRed.value = 0, this.tesseractLines[t].uniforms.uRedToBlue.value = 0), this.tesseractLines[t].setPosition(this.tesseractLines[t].startPosition.x + this.progress.reveal4D * this.tesseractLines[t].endPositionDelta.x, this.tesseractLines[t].startPosition.y + this.progress.reveal4D * this.tesseractLines[t].endPositionDelta.y, this.tesseractLines[t].startPosition.z + this.progress.reveal4D * this.tesseractLines[t].endPositionDelta.z), this.tesseractLines[t].setScale(this.progress.reveal4D, this.progress.reveal4D, this.progress.reveal4D);
      for (let t = 0;
        t < this.tesseracts.length;
        t++)this.progress.reveal2D >= 1 && this.progress.reveal3D < 1 ? (this.tesseracts[t].uniforms.uGreenToRed.value = 1, this.tesseracts[t].uniforms.uRedToBlue.value = 0) : this.progress.reveal3D >= 1 && this.progress.reveal4D < 1 ? (this.tesseracts[t].uniforms.uGreenToRed.value = 1, this.tesseracts[t].uniforms.uRedToBlue.value = 1) : (this.tesseracts[t].uniforms.uGreenToRed.value = 0, this.tesseracts[t].uniforms.uRedToBlue.value = 0);
      this.renderer.gl.clearColor(0, 0, 0, 0), this.renderer.render(this.volume, this.camera)
    }
  } class C {
    constructor() {
      this.dimensions = new U, this.progress = {
        value: 0, questionMarks: 0
      }, this.two = document.querySelector("section.dimensions .dimensions--copy .two"), this.three = document.querySelector("section.dimensions .dimensions--copy .three"), this.four = document.querySelector("section.dimensions .dimensions--copy .four")
    } onResize(t) {
      this.scene = this.dimensions.scene, this.scene.fromTo(this.progress, {
        value: [0, 3]
      }, {
        duration: 3
      }, 0), this.scene.fromTo(this.two, {
        scale: [1, 1.25]
      }, {
        duration: 1.25, ease: "easeOutExpo"
      }, 0), this.scene.fromTo(this.three, {
        scale: [1, 1.25]
      }, {
        duration: .5, ease: "easeOutExpo"
      }, 1.25), this.scene.fromTo(this.four, {
        scale: [1, 1.25]
      }, {
        duration: 1.25, ease: "easeOutExpo"
      }, 1.75), this.scene.fromTo(this.progress, {
        questionMarks: [0, 24]
      }, {
        duration: 1.25
      }, 1.75)
    } onUpdate(t) {
      this.progress.value >= 0 && this.progress.value < 1.25 ? (this.two.classList.remove("hidden"), this.three.classList.add("hidden"), this.four.classList.add("hidden")) : this.progress.value >= 1.25 && this.progress.value < 1.75 ? (this.two.classList.add("hidden"), this.three.classList.remove("hidden"), this.four.classList.add("hidden")) : (this.two.classList.add("hidden"), this.three.classList.add("hidden"), this.four.classList.remove("hidden"));
      let e = "";
      for (let t = 0;
        t < this.progress.questionMarks;
        t++)e += "?";
      this.four.textContent = `XR${e}`
    }
  } let F = null;
  class U extends s {
    constructor() {
      if (super(), F) return F;
      F = this, this.setDOM("section.dimensions"), this.attachScene(), this.progress = 0, this.addAnimation(new D), this.addAnimation(new L), this.addAnimation(new C)
    } initializeTextFocus() {
      const t = this.viewport.height / 100;
      this.DOM.querySelectorAll("[data-focus]").forEach((e => {
        const s = e.dataset.focus * t + this.DOM.offsetTop;
        e.dataset.focusOffset = s
      }))
    } attachScene() {
      this.scene = new m.Scene
    } onScroll(t) {
      if (super.onScroll(t), this.isActive) {
        const e = this.metrics.scrollY + this.enterThreshold, s = this.metrics.scrollY + this.metrics.height + this.exitThreshold, i = t.y - e;
        this.progress = i / (s - e)
      } else t.y <= this.metrics.scrollY + this.enterThreshold ? this.progress = 0 : this.progress = 1, this.scene.setProgressImmediately(this.progress)
    } onResize(t) {
      this.viewport = t, this.attachScene(), super.onResize(t), this.enterThreshold = -t.height, this.initializeTextFocus()
    } onUpdate(t) {
      this.isActive && (this.scene.setProgressImmediately(this.progress), this.animations.forEach((e => {
        e.onUpdate && e.onUpdate(t)
      })))
    }
  } class N {
    constructor() {
      this.photography = new B, this.progress = {
        value: 0
      }, this.background = document.querySelector("section.photography .photography--background")
    } onResize(t) {
      this.viewport = t, this.scene = this.photography.scene, this.scene.fromTo(this.background, {
        opacity: [0, 1]
      }, {
        duration: 1
      }, 0), this.scene.fromTo(this.progress, {
        value: 1
      }, {
        duration: 3
      }, 0)
    }
  } class k {
    constructor() {
      this.photography = new B, this.collage = document.querySelector("section.photography .photography--collage")
    } onResize(t) {
      this.viewport = t, this.scene = this.photography.scene, this.scene.addClass(this.collage, {
        class: "enter"
      }, {
        toggle: !0
      }, .75)
    }
  } class Y {
    constructor() {
      this.photography = new B, this.textElement = document.querySelector("section.photography span")
    } onDestroy() {
      this.textElement.style.transform = ""
    } onResize(t) {
      this.textElement.style.transform = "translateY(100%)", this.scene = this.photography.scene, this.scene.fromTo(this.textElement, {
        translateY: [100, -100]
      }, {
        duration: 2.4, ease: "linear"
      }, 0)
    }
  } let H = null;
  class B extends s {
    constructor() {
      if (super(), H) return H;
      H = this, this.setDOM("section.photography"), this.attachScene(), this.progress = 0, this.addAnimation(new N), this.addAnimation(new k), this.addAnimation(new Y)
    } initializeTextFocus() {
      const t = this.viewport.height / 100;
      this.DOM.querySelectorAll("[data-focus]").forEach((e => {
        const s = e.dataset.focus * t + this.DOM.offsetTop;
        e.dataset.focusOffset = s
      }))
    } attachScene() {
      this.scene = new m.Scene
    } onScroll(t) {
      if (super.onScroll(t), this.isActive) {
        const e = this.metrics.scrollY + this.enterThreshold, s = this.metrics.scrollY + this.metrics.height + this.exitThreshold, i = t.y - e;
        this.progress = i / (s - e)
      } else t.y <= this.metrics.scrollY + this.enterThreshold ? this.progress = 0 : this.progress = 1, this.scene.setProgressImmediately(this.progress)
    } onResize(t) {
      this.viewport = t, this.attachScene(), super.onResize(t), this.enterThreshold = -t.height, this.exitThreshold = t.height / 2, this.initializeTextFocus()
    } onUpdate(t) {
      this.isActive && (this.scene.setProgressImmediately(this.progress), this.animations.forEach((e => {
        e.onUpdate && e.onUpdate(t)
      })))
    }
  } class q {
    constructor() {
      this.travel = new X, this.destroyed = !1, this.progress = {
        xPosition: 0, yPosition: 0, fontSize: 4, xOffset: 0
      }, this.viewport = {
        width: window.innerWidth, height: window.innerHeight, aspectRatio: window.innerWidth / window.innerHeight
      }, this.introText = document.getElementById("travel-intro"), this.canvas = document.getElementById("adventures-mask"), this.ctx = this.canvas.getContext("2d"), this.ctx.font = "600 96px Articulat CF", this.text = this.ctx.measureText("reviews"), this.imageDimensions = {
        aspectRatio: 1.8, height: 800, width: 1440, scaledHeight: 0, scaledWidth: 0, xOffset: 0, yOffset: 0
      }, this.image = new Image, this.imageReady = !1, this.image.onload = () => {
        this.imageReady = !0, this.imageDimensions.height = this.image.height, this.imageDimensions.width = this.image.width, this.imageDimensions.aspectRatio = this.image.width / this.image.height, this.setImageDimensions()
      }, this.orientation = window.matchMedia("(orientation: portrait)"), this.orientation.matches ? this.image.src = "images/travel-1x--portrait.jpg" : this.image.src = "images/travel-1x.jpg", this.initialRender = !1
    } draw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), this.imageReady && (this.ctx.globalCompositeOperation = "destination-atop", this.ctx.drawImage(this.image, this.imageDimensions.xOffset, this.imageDimensions.yOffset, this.imageDimensions.scaledWidth, this.imageDimensions.scaledHeight, 0, 0, this.canvas.width, this.canvas.height)), this.ctx.fillStyle = "rgb(255, 255, 255)", this.ctx.font = `600 ${this.progress.fontSize}vw Articulat CF`, this.text = this.ctx.measureText("reviews"), this.lastChar = this.ctx.measureText("s"), this.ctx.fillText("reviews", this.progress.xPosition - this.text.width / 2 - (this.text.width / 2 - this.lastChar.width / 2) * this.progress.xOffset, this.progress.yPosition + this.lastChar.actualBoundingBoxAscent / 2 * this.progress.xOffset)
    } setImageDimensions() {
      this.viewport.aspectRatio < this.imageDimensions.aspectRatio ? (this.imageDimensions.scaledHeight = this.imageDimensions.height, this.imageDimensions.scaledWidth = this.imageDimensions.height * this.viewport.aspectRatio, this.imageDimensions.xOffset = this.imageDimensions.width / 2 - this.imageDimensions.scaledWidth / 2, this.imageDimensions.yOffset = 0) : (this.imageDimensions.scaledHeight = this.imageDimensions.width / this.viewport.aspectRatio, this.imageDimensions.scaledWidth = this.imageDimensions.width, this.imageDimensions.xOffset = 0, this.imageDimensions.yOffset = this.imageDimensions.height / 2 - this.imageDimensions.scaledHeight / 2)
    } onDestroy() {
      this.introText.style.opacity = 1, this.introText.style.transform = "translate(-50%, -50%)", this.destroyed = !0
    } onResize(t) {
      this.viewport = t, this.canvas.width = this.viewport.width, this.canvas.height = this.viewport.height, this.destroyed || (this.orientation.matches ? this.image.src = "images/travel-1x--portrait.jpg" : this.image.src = "images/travel-1x.jpg"), this.setImageDimensions(), this.progress = {
        xPosition: this.canvas.width, yPosition: this.canvas.height, fontSize: 4, xOffset: 0
      }, this.scene = this.travel.scene, this.scene.fromTo(this.progress, {
        xPosition: [this.canvas.width, this.canvas.width / 2], fontSize: [8, 16]
      }, {
        duration: 1
      }, 0), this.scene.fromTo(this.introText, {
        translateX: [-50, -50], translateY: [-50, -400], opacity: [1, 0]
      }, {
        duration: 1
      }, 1), this.scene.fromTo(this.progress, {
        xOffset: [0, 1], yPosition: [this.canvas.height, this.canvas.height / 2], fontSize: [16, 32]
      }, {
        duration: 1
      }, 1), this.scene.fromTo(this.progress, {
        fontSize: [32, 512]
      }, {
        duration: 1
      }, 2), this.initialRender = !1
    } onUpdate(t) {
      this.now = t * this.timeScale, this.time += this.now - this.then, this.then = this.now, this.initialRender ? this.draw() : (this.initialRender = !0, this.scene.setProgressImmediately(.25))
    }
  } class V {
    constructor() {
      this.travel = new X, this.overlay = document.querySelector("section.travel .travel--overlay")
    } onResize(t) {
      this.scene = this.travel.scene, this.scene.fromTo(this.overlay, {
        opacity: [0, 1]
      }, {
        duration: 1
      }, 2)
    }
  } let G = null;
  class X extends s {
    constructor() {
      if (super(), G) return G;
      G = this, this.setDOM("section.travel"), this.attachScene(), this.progress = 0, this.addAnimation(new q), this.addAnimation(new V)
    } initializeTextFocus() {
      const t = this.viewport.height / 100;
      this.DOM.querySelectorAll("[data-focus]").forEach((e => {
        const s = e.dataset.focus * t + this.DOM.offsetTop;
        e.dataset.focusOffset = s
      }))
    } attachScene() {
      this.scene = new m.Scene
    } onScroll(t) {
      if (super.onScroll(t), this.isActive) {
        const e = this.metrics.scrollY + this.enterThreshold, s = this.metrics.scrollY + this.metrics.height + this.exitThreshold, i = t.y - e;
        this.progress = i / (s - e)
      } else t.y <= this.metrics.scrollY + this.enterThreshold ? this.progress = 0 : this.progress = 1, this.scene.setProgressImmediately(this.progress)
    } onResize(t) {
      this.viewport = t, this.attachScene(), super.onResize(t), this.enterThreshold = -t.height / 4, this.exitThreshold = -t.height, this.initializeTextFocus()
    } onUpdate(t) {
      this.isActive && (this.scene.setProgressImmediately(this.progress), this.animations.forEach((e => {
        e.onUpdate && e.onUpdate(t)
      })))
    }
  } class j {
    constructor() {
      this.contact = new $, this.progress = {
        value: 0
      }, this.textWrapper = document.querySelector("section.contact .contact--copy"), this.text = document.querySelector("section.contact .contact--copy p"), this.played = !1, this.splitTitle()
    } splitTitle() {
      const t = this.text, e = [...t.childNodes];
      for (;
        t.firstChild;
      )t.removeChild(t.firstChild);
      for (let s = 0;
        s < e.length;
        s++) {
        let i = e[s];
        if (i.nodeType === Node.TEXT_NODE) {
          let e = i.textContent.split(" ");
          for (let s = 0;
            s < e.length;
            s++)if ("" !== e[0] || 0 !== s) {
              if (i = document.createElement("span"), i.setAttribute("role", "text"), "" === e[0]) {
                let t = document.createTextNode(" " + e[s]);
                i.appendChild(t)
              } else {
                let t = document.createTextNode(e[s]);
                s !== e.length - 1 && (t = document.createTextNode(e[s] + " ")), i.appendChild(t)
              } t.appendChild(i)
            }
        } t.appendChild(i)
      } this.splitText = document.querySelectorAll("section.contact .contact--copy p span, section.contact .contact--copy .contact--cta")
    } onDestroy() {
      this.textWrapper.style.opacity = 1, this.splitText.forEach((t => {
        t.style.opacity = 1, t.style.transform = ""
      }))
    } onResize(t) {
      this.scene = this.contact.scene, this.textAnimation = new m.Scene, this.textAnimation.fromTo(this.splitText, {
        opacity: [0, 1], translateY: [50, 0]
      }, {
        duration: 1, ease: "easeOutExpo", stagger: .1
      }, 0), this.scene.fromTo(this.progress, {
        value: [0, 1]
      }, {
        duration: 3
      }, 0), this.scene.fromTo(this.textWrapper, {
        opacity: [0, 1]
      }, {
        duration: .5, ease: "easeInOutExpo", onComplete: () => {
          this.played && "0" !== this.splitText[0].style.opacity || (this.textAnimation.play(), this.played = !0)
        }
      }, 0)
    }
  } class W {
    constructor() {
      this.contact = new $, this.bounds = {
        top: 0, left: 0, width: 0, height: 0
      }, this.mouse = {
        x: 0, y: 0, xOffsetTarget: 0, xOffsetCurrent: 0, yOffsetTarget: 0, yOffsetCurrent: 0
      }, this.touchEvent = !1, this.cta = document.querySelector("section.contact .contact--copy .contact--cta a")
    } calculateMouseOffset() {
      this.mouse.xOffsetTarget = (this.mouse.x - this.bounds.left - this.bounds.width / 2) / (this.viewport.width / 2), this.mouse.yOffsetTarget = (this.mouse.y - this.bounds.top - this.bounds.height / 2) / (this.viewport.height / 2)
    } lerp(t, e, s) {
      return (1 - s) * t + s * e
    } onDestroy() {
      this.cta.style.transform = ""
    } onResize(t) {
      this.viewport = t
    } onMouseDown(t) {
      t.changedTouches && (this.touchEvent = !0)
    } onMouseMove(t) {
      this.touchEvent || (this.bounds = this.cta.getBoundingClientRect(), this.mouse.x = t.clientX, this.mouse.y = t.clientY), this.touchEvent = !1
    } onUpdate(t) {
      this.calculateMouseOffset(), this.mouse.xOffsetCurrent = this.lerp(this.mouse.xOffsetCurrent, this.mouse.xOffsetTarget, .1), this.mouse.yOffsetCurrent = this.lerp(this.mouse.yOffsetCurrent, this.mouse.yOffsetTarget, .1), this.cta.style.transform = `translate(${100 * this.mouse.xOffsetCurrent}%, ${100 * this.mouse.yOffsetCurrent}%)`
    }
  } let Q = null;
  class $ extends s {
    constructor() {
      if (super(), Q) return Q;
      Q = this, this.persistentAnimation = !0, this.setDOM("section.contact"), this.attachScene(), this.progress = 0, this.addAnimation(new j), this.addAnimation(new W)
    } initializeTextFocus() {
      const t = this.viewport.height / 100;
      this.DOM.querySelectorAll("[data-focus]").forEach((e => {
        const s = e.dataset.focus * t + this.DOM.offsetTop;
        e.dataset.focusOffset = s
      }))
    } attachScene() {
      this.scene = new m.Scene
    } onScroll(t) {
      if (super.onScroll(t), this.isActive) {
        const e = this.metrics.scrollY + this.enterThreshold, s = this.metrics.scrollY + this.metrics.height + this.exitThreshold, i = t.y - e;
        this.progress = i / (s - e)
      } else t.y <= this.metrics.scrollY + this.enterThreshold ? this.progress = 0 : this.progress = 1, this.scene.setProgressImmediately(this.progress)
    } onResize(t) {
      this.viewport = t, this.attachScene(), super.onResize(t), this.initializeTextFocus()
    } onEnter() {
      this.isActive || (this.enable(), this.animations.forEach((t => {
        t.onEnter && t.onEnter()
      })))
    } onExit() {
      this.isActive && this.disable(), this.animations.forEach((t => {
        t.onExit && t.onExit()
      }))
    } onMouseMove(t) {
      this.isActive && this.animations.forEach((e => {
        e.onMouseMove && e.onMouseMove(t)
      }))
    } onUpdate(t) {
      this.isActive && (this.scene.setProgressImmediately(this.progress), this.animations.forEach((e => {
        e.onUpdate && e.onUpdate(t)
      })))
    }
  } class Z {
    constructor() {
      this.viewport = {
        width: window.innerWidth, height: window.innerHeight, aspectRatio: window.innerWidth / window.innerHeight
      }, this.DOM = document.querySelectorAll("section.work .work--grid .work--item"), this.cards = [];
      const t = window.matchMedia("(min-width: 768px)");
      t.addListener(this.mediaMatch.bind(this)), this.mediaMatch(t)
    } mediaMatch(t) {
      t.matches ? this.shouldAnimate = !0 : this.shouldAnimate = !1
    } createCardObjects() {
      this.cards = [], this.DOM.forEach(((t, e) => {
        this.cards.push({
          DOM: t, scrollY: t.offsetTop, height: t.clientHeight, progress: 0, offsetMultiplier: 1 === e || 4 === e ? 4 : 1
        })
      }))
    } createScenes() {
      this.cards.forEach((t => {
        const e = new m.Scene;
        e.fromTo(t.DOM, {
          translateY: [25 * t.offsetMultiplier, 0]
        }, {
          duration: 1, ease: "easeInOutSine"
        }, 0), t.scene = e
      }))
    } onDestroy() {
      this.cards.forEach((t => {
        t.DOM.style.transform = ""
      }))
    } onResize(t) {
      this.viewport = t, this.shouldAnimate ? (this.createCardObjects(), this.createScenes()) : this.cards = []
    } onScroll(t) {
      this.shouldAnimate ? this.cards.forEach((e => {
        if (t.y >= e.scrollY - this.viewport.height) {
          const s = (t.y - (e.scrollY - this.viewport.height)) / e.height;
          e.progress = Math.min(s, 1)
        } else e.progress = 0;
        e.scene.setProgressImmediately(e.progress)
      })) : this.DOM.forEach((t => {
        t.style.transform = ""
      }))
    }
  } class K {
    constructor() {
      this.time = 0, this.then = 0, this.now = 0, this.timeScale = 5e-4, this.canvas = document.getElementById("anotherdei-background"), this.renderer = new c.Renderer(this.canvas), this.renderer.pixelRatio = 1, this.renderer.depthTest = !1, this.volume = new c.Volume, this.camera = new c.Orthographic(-1, 1, -1, 1, -1, 1);
      const t = new c.Plane(2, 2, 1, 1), e = new c.Program(this.renderer.gl, "#ifdef GL_FRAGMENT_PRECISION_HIGH\n\tprecision highp float;\n#else\n\tprecision mediump float;\n#define GLSLIFY 1\n#endif\n\nattribute vec4 aPosition;\nattribute vec3 aNormal;\nattribute vec2 aUV;\n\nuniform mat4 uViewProjectionMatrix;\nuniform mat4 uNormalMatrix;\nuniform mat4 uLocalMatrix;\n\nvarying vec3 vNormal;\nvarying vec2 vUV;\n\nvoid main() {\n\tvec4 position = uViewProjectionMatrix * uLocalMatrix * aPosition;\n\tgl_Position = position;\n\tvNormal = aNormal;\n\tvUV = aUV;\n}", "#ifdef GL_FRAGMENT_PRECISION_HIGH\n\tprecision highp float;\n#else\n\tprecision mediump float;\n#define GLSLIFY 1\n#endif\n\nuniform float uTime;\n\nvarying vec3 vNormal;\nvarying vec2 vUV;\n\nvec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}\nvec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}\n\nfloat snoise(vec3 v){ \n\tconst vec2  C = vec2(1.0/6.0, 1.0/3.0);\n\tconst vec4  D = vec4(0.0, 0.5, 1.0, 2.0);\n\n\tvec3 i  = floor(v + dot(v, C.yyy) );\n\tvec3 x0 =   v - i + dot(i, C.xxx) ;\n\n\tvec3 g = step(x0.yzx, x0.xyz);\n\tvec3 l = 1.0 - g;\n\tvec3 i1 = min( g.xyz, l.zxy );\n\tvec3 i2 = max( g.xyz, l.zxy );\n\n\tvec3 x1 = x0 - i1 + 1.0 * C.xxx;\n\tvec3 x2 = x0 - i2 + 2.0 * C.xxx;\n\tvec3 x3 = x0 - 1. + 3.0 * C.xxx;\n\n\ti = mod(i, 289.0 ); \n\tvec4 p = permute( permute( permute( \n\t\ti.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n\t+ i.y + vec4(0.0, i1.y, i2.y, 1.0 )) \n\t+ i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n\tfloat n_ = 1.0/7.0;\n\tvec3  ns = n_ * D.wyz - D.xzx;\n\n\tvec4 j = p - 49.0 * floor(p * ns.z *ns.z);\n\n\tvec4 x_ = floor(j * ns.z);\n\tvec4 y_ = floor(j - 7.0 * x_ );\n\n\tvec4 x = x_ *ns.x + ns.yyyy;\n\tvec4 y = y_ *ns.x + ns.yyyy;\n\tvec4 h = 1.0 - abs(x) - abs(y);\n\n\tvec4 b0 = vec4( x.xy, y.xy );\n\tvec4 b1 = vec4( x.zw, y.zw );\n\n\tvec4 s0 = floor(b0)*2.0 + 1.0;\n\tvec4 s1 = floor(b1)*2.0 + 1.0;\n\tvec4 sh = -step(h, vec4(0.0));\n\n\tvec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;\n\tvec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;\n\n\tvec3 p0 = vec3(a0.xy,h.x);\n\tvec3 p1 = vec3(a0.zw,h.y);\n\tvec3 p2 = vec3(a1.xy,h.z);\n\tvec3 p3 = vec3(a1.zw,h.w);\n\n\tvec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n\tp0 *= norm.x;\n\tp1 *= norm.y;\n\tp2 *= norm.z;\n\tp3 *= norm.w;\n\n\tvec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n\tm = m * m;\n\treturn 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), \n\t\tdot(p2,x2), dot(p3,x3) ) );\n}\n\nvoid main() {\n\tfloat v = snoise(vec3(vUV*3., uTime/16.));\n  \tfloat expo = pow(v, 10.0)/4. + v/12.;\n\tgl_FragColor = vec4(expo, expo, expo, 1.0);\n}");
      this.morphMesh = new c.Mesh(t, e), this.morphMesh.setPosition(0, 0, 0), this.morphMesh.setUniform("uTime", 0, "1f"), this.volume.add(this.morphMesh);
      const s = new c.Plane(2, 2, 1, 1), i = new c.Program(this.renderer.gl, "#ifdef GL_FRAGMENT_PRECISION_HIGH\n\tprecision highp float;\n#else\n\tprecision mediump float;\n#define GLSLIFY 1\n#endif\n\nattribute vec4 aPosition;\nattribute vec3 aNormal;\nattribute vec2 aUV;\n\nuniform mat4 uViewProjectionMatrix;\nuniform mat4 uNormalMatrix;\nuniform mat4 uLocalMatrix;\n\nvarying vec3 vNormal;\nvarying vec2 vUV;\n\nvoid main() {\n\tvec4 position = uViewProjectionMatrix * uLocalMatrix * aPosition;\n\tgl_Position = position;\n\tvNormal = aNormal;\n\tvUV = aUV;\n}", "#ifdef GL_FRAGMENT_PRECISION_HIGH\n\tprecision highp float;\n#else\n\tprecision mediump float;\n#define GLSLIFY 1\n#endif\n\nuniform float uTime;\n\nvarying vec3 vNormal;\nvarying vec2 vUV;\n\nfloat hash(vec2 p) { return fract(1e4 * sin(17.0 * p.x + p.y * 0.1) * (0.1 + abs(sin(p.y * 13.0 + p.x)))); }\n\nvoid main() {\n\tfloat color = hash(vUV + uTime);\n\tgl_FragColor = vec4(vec3(color) * 0.1, 0.1);\n}");
      this.grainMesh = new c.Mesh(s, i), this.grainMesh.setPosition(0, 0, 1), this.grainMesh.setUniform("uTime", 0, "1f"), this.volume.add(this.grainMesh)
    } lerp(t, e, s) {
      return (1 - s) * t + s * e
    } onResize() {
      this.renderer.resize()
    } onUpdate(t) {
      this.now = t * this.timeScale, this.time += this.now - this.then, this.then = this.now, this.renderer.gl.clearColor(0, 0, 0, 0), this.renderer.render(this.volume, this.camera), this.morphMesh.uniforms.uTime.value = 4 * this.time, this.grainMesh.uniforms.uTime.value = this.time
    }
  } let J = null;
  class tt extends s {
    constructor() {
      if (super(), J) return J;
      J = this, this.persistentAnimation = !0, this.setDOM("section.work"), this.addAnimation(new Z), this.addAnimation(new K)
    } onScroll(t) {
      super.onScroll(t)
    } onResize(t) {
      super.onResize(t), this.enterThreshold = -this.viewport.height
    } onUpdate(t) {
      this.isActive && this.animations.forEach((e => {
        e.onUpdate && e.onUpdate(t)
      }))
    }
  } new class {
    constructor() {
      if (this.menu = new e, this._initializeLazyLoad(), this.lazyLoad = this.lazyLoad.bind(this), window.addEventListener("scroll", this.lazyLoad), this.enhanced = window.enhancedExperience, this.enhanced) {
        this._createViewportTracker(), this.onScroll = this.onScroll.bind(this), this.debounceResize = this.debounceResize.bind(this), this.onMouseDown = this.onMouseDown.bind(this), this.onMouseUp = this.onMouseUp.bind(this), this.onMouseMove = this.onMouseMove.bind(this), this.sections = [], this.sections.push(new v), this.sections.push(new M), this.sections.push(new b), this.sections.push(new _), this.sections.push(new O), this.sections.push(new U), this.sections.push(new B), this.sections.push(new X), this.sections.push(new $), this.sections.push(new tt), this.addEventListeners(), this.ticking = !1, this.persistentAnimation = !1, this.viewport = {
          width: 0, height: 0, aspectRatio: 0
        }, this.scrollMetrics = {
          x: 0, y: 0
        }, this.pressed = !1, this.resizeTimer = 0;
        let e = new t;
        e.length && Promise.all(e).then((() => {
          this.onPreloaded(), this.onResize(), this.hasPersistentAnimation(), this.onUpdate(0), this._handlePageAnchor(), this._initializeTextFocus()
        }))
      }
    } _destroyEnhancedExperience() {
      document.documentElement.classList.remove("enhanced"), this.sections.forEach((t => {
        t.onDestroy()
      })), this.sections = [], this.removeEventListeners()
    } _handlePageAnchor() {
      const t = window.location.hash;
      if (t) {
        const e = document.getElementById(t.split("#")[1]);
        window.scrollTo(0, e.offsetTop), e.focus()
      }
    } _initializeTextFocus() {
      this.sections.forEach((t => {
        t.initializeTextFocus && t.initializeTextFocus()
      }));
      document.querySelectorAll("[data-focus]").forEach((t => {
        t.addEventListener("focusin", (e => {
          this.pressed || (window.scrollTo(0, t.dataset.focusOffset), t.blur())
        }))
      }))
    } _initializeLazyLoad() {
      const t = document.querySelectorAll("section");
      this.lazyLoadItems = [], t.forEach((t => {
        this.lazyLoadItems.push({
          section: t, scrollTarget: t.offsetTop - t.offsetHeight, lazyTarget: t.querySelector("picture[data-lazy]"), lazyData: t.querySelector("noscript"), loaded: !1
        })
      }))
    } lazyLoad() {
      this.lazyLoadItems.forEach((t => {
        if (!t.loaded && (window.scrollY >= t.scrollTarget || window.pageYOffset >= t.scrollTarget)) {
          if (t.lazyTarget && t.lazyData) {
            const e = document.createElement("picture");
            e.innerHTML = t.lazyData.textContent;
            const s = e.firstChild;
            s.setAttribute("data-lazy", ""), t.lazyTarget.parentNode.replaceChild(s, t.lazyTarget)
          } t.loaded = !0
        }
      }))
    } _createViewportTracker() {
      this.viewportTracker = document.createElement("div"), this.viewportTracker.id = "viewport-tracker", this.viewportTracker.style.height = "100vh", this.viewportTracker.style.opacity = 0, this.viewportTracker.style.pointerEvents = "none", this.viewportTracker.style.position = "fixed", this.viewportTracker.style.top = 0, this.viewportTracker.style.left = 0, this.viewportTracker.style.width = "100vw", this.viewportTracker.style.visibility = "hidden", this.viewportTracker.style.zIndex = -1, document.body.appendChild(this.viewportTracker)
    } hasPersistentAnimation() {
      this.persistentAnimation = !1, this.sections.forEach((t => {
        t.isActive && t.persistentAnimation && (this.persistentAnimation = !0)
      }))
    } tick() {
      this.ticking || (this.frame = window.requestAnimationFrame(this.onUpdate.bind(this))), this.ticking = !0
    } debounceResize() {
      clearTimeout(this.resizeTimer), this.resizeTimer = setTimeout(this.onResize.bind(this), 400)
    } onPreloaded() {
      this.sections.forEach((t => {
        t.onPreloaded && t.onPreloaded()
      }))
    } onScroll() {
      const t = {
        x: window.scrollX || window.pageXOffset, y: window.scrollY || window.pageYOffset
      };
      this.needsScrollUpdate = this.scrollMetrics.x !== t.x || this.scrollMetrics.y !== t.y, this.scrollMetrics = t, this.persistentAnimation || this.tick()
    } onResize() {
      const t = this.viewportTracker.getBoundingClientRect(), e = {
        width: t.width, height: t.height, aspectRatio: t.width / t.height
      };
      e.aspectRatio >= 2.49 && this._destroyEnhancedExperience();
      (this.viewport.width !== e.width || this.viewport.height !== e.height) && (this.viewport = e, this.sections.forEach((t => {
        t.onResize && t.onResize(e)
      })), this._initializeLazyLoad())
    } onMouseDown(t) {
      this.pressed = !0, this.sections.forEach((e => {
        e.onMouseDown && e.onMouseDown(t)
      }))
    } onMouseUp(t) {
      this.pressed = !1, this.sections.forEach((e => {
        e.onMouseUp && e.onMouseUp(t)
      }))
    } onMouseMove(t) {
      this.sections.forEach((e => {
        e.onMouseMove && e.onMouseMove(t)
      }))
    } addEventListeners() {
      window.addEventListener("scroll", this.onScroll), window.addEventListener("resize", this.debounceResize), window.addEventListener("mousedown", this.onMouseDown), window.addEventListener("mouseup", this.onMouseUp), window.addEventListener("mousemove", this.onMouseMove), window.addEventListener("touchstart", this.onMouseDown), window.addEventListener("touchend", this.onMouseUp), window.onfocus = () => {
        this.sections.forEach((t => {
          t.onResize && t.onResize(this.viewport)
        })), window.cancelAnimationFrame(this.frame), this.needsScrollUpdate = !0, this.onUpdate(0)
      }, document.addEventListener("visibilitychange", (() => {
        "visible" === document.visibilityState && (this.sections.forEach((t => {
          t.onResize && t.onResize(this.viewport)
        })), this.needsScrollUpdate = !0, this.onUpdate(0))
      }))
    } removeEventListeners() {
      window.removeEventListener("scroll", this.onScroll), window.removeEventListener("resize", this.debounceResize), window.removeEventListener("mousedown", this.onMouseDown), window.removeEventListener("mouseup", this.onMouseUp), window.removeEventListener("mousemove", this.onMouseMove), window.removeEventListener("touchstart", this.onMouseDown), window.removeEventListener("touchend", this.onMouseUp)
    } onUpdate(t) {
      this.ticking = !1, this.needsScrollUpdate && this.sections.forEach((t => {
        t.onScroll && t.onScroll(this.scrollMetrics)
      })), this.sections.forEach((e => {
        e.onUpdate && e.onUpdate(t)
      })), this.hasPersistentAnimation(), this.persistentAnimation ? (this.sections.forEach((e => {
        e.onUpdate && e.persistentAnimation && e.onUpdate(t)
      })), this.frame = window.requestAnimationFrame(this.onUpdate.bind(this))) : this.sections.forEach((e => {
        e.onUpdate && e.onUpdate(t)
      }))
    }
  }
})();
